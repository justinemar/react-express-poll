import React from 'react';
import { Link } from 'react-router-dom';





export default class Polls extends React.Component {

    render(){
        const { match, polls } = this.props;
        const pollsList = polls ? polls.map((i, index) => (
            <Link key={index} to={`${match.url}/${i._id}`}>
                <div className="poll">
                    <h1> {i.title} </h1>
                </div>
            </Link>
        )) : null
        return (
            <div id="poll-list-wrapper">
              {pollsList}
            </div>
            )
    }
}
