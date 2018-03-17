import React from 'react';
import PollForm from './PollForm';

class NewPoll extends React.Component{
    
    state = {
        validate: {
            message: null,
            className: null
        }
    }
    
    createPoll = (e) => {
        e.preventDefault()
        const title = this.title.value;
        const options = this.options.value.split(',');
        if(options.length <= 1){
            this.setState({
                validate: {
                    message: 'Error: You need two or more options',
                    className: 'error-p'
                }
            })
            return false;
        }
    
        fetch('/api/newpoll', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({title: title, options: options}),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
        .then(res => {
            this.setState({
                validate: {
                    message: res.message,
                    className: res.type
                }
            })
        }).catch(err => {
            return err;
        })
    }
    
    render(){
        const { validate } = this.state;
        return (
        <div>
            <div className="container">
                <div className="create-poll-wrapper">
                    <div className="create-poll-form">
                        <PollForm submitFunc={this.createPoll} 
                            pollOptions={i => this.options = i} 
                                pollTitle={i => this.title = i}
                                    validate={validate}/>
                    </div>
                </div>
            </div>
        </div>
            );
    }
}


export default NewPoll;