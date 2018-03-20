import React from 'react';
import './Poll.css';
import PollModule from './PollModule';


export default class Poll extends React.Component{
    


    render(){
        const { match, polls } = this.props;
        const data = polls ? polls.filter(i => i._id === this.props.match.params.poll) 
            : 
        null;
        return(
                <PollModule renewData={this.props.renewData} match={match} data={data}/>
            );
    }
}
