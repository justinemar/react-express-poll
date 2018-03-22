import React from 'react';
import PollModule from './PollModule';




export default class PublicPolls extends React.Component {

    render(){
        const { match, polls, email } = this.props;
        const selectedPoll = polls ? polls.filter(i => i._id === match.params.poll) : null;
        return (
                <PollModule {...this.props} email={email} renewData={this.props.renewData} selectedPoll={selectedPoll} />
            )
    }
}
