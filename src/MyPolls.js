import React from 'react';
import Spinner from './Spinner.gif';
import { Link, Route } from 'react-router-dom';
import Poll from './Poll';


export default class MyPolls extends React.Component{
    
    state = {
        polls: null
    }
    
    shouldComponentUpdate(nextProps,nextState){
        return this.state.polls !== nextState;
    }
    
    getData = () => {
        fetch('/api/mypolls', { method: 'GET' , credentials: 'same-origin'})
         .then(polls => polls.json())
              .then(polls => {
                 this.setState({
                     polls: polls.polls
                 })
        }).catch(err => err);     
    }
    
    componentDidMount(){
        this.getData();
    }

    render(){
        const { match } = this.props;
        const { polls } = this.state;
        const userPolls = polls ? polls.map((i, index) => {
            const slug = i._id;
            return (
               <Link key={index} to={{
                    pathname: `${match.url}/${slug}`, 
                    state: {data: polls}}}>
                    <div className="poll-container">
                        <h2> { i.title } </h2>
                    </div>
               </Link>
                )
        }) : <img src={Spinner}/>
        return (
        <div>
            <div id="poll-list">
                <h1> My Polls </h1>
                    {userPolls}
            </div>
                <Route path={`${match.url}/:poll`}
                    render={(props) => <Poll  getData={this.getData} polls={polls} {...props}/>}
                />
        </div>
            )
    }
}