import React from 'react';
import Spinner from './Spinner.gif';
import { Link, Route } from 'react-router-dom';
import Poll from './Poll';


export default class MyPolls extends React.Component{
    

    render(){
        const { match, polls } = this.props;
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
                    render={(props) => <Poll  renewData={this.props.renewData} polls={polls} {...props}/>}
                />
        </div>
            )
    }
}