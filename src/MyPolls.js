import React from 'react';
import Spinner from './Spinner.gif';
import { Link, Route } from 'react-router-dom';


export default class MyPolls extends React.Component{
    
    state = {
        mypolls: null
    }
    componentDidMount(){
        this.myPolls();
    }
    
    
    myPolls = () => {
      fetch('/api/mypolls', { method: 'GET', credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            this.setState({
                mypolls: res.polls
            })
        }).catch(err => err);
    }
    
    render(){
        const { match } = this.props;
        const { mypolls } = this.state;
        const userPolls = mypolls ? mypolls.map((i, index) => {
            const slug = i._id;
            return (
               <Link key={index} to={`/polls/${slug}`}>
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
        </div>
            )
    }
}