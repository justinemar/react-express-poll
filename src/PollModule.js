import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';



export default class PollModule extends React.Component{
    
    
    state = {
        selection: undefined
    }
    
    
    renewData = () => {
        
    }
    
    
    vote = (e) => {
        const pollID = this.props.match.params.poll
        fetch('/api/vote', {
            method: 'POST',
            body: JSON.stringify({ vote: this.state.selection, pollID: pollID }),
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
          this.props.renewData();
        }).catch(err => console.log(err));
    }
    
    onChangeHandle = (e) => {
        this.setState({
            selection: e.target.value
        })   
    }
    render(){
        const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];
        const { selection } = this.state;
        const { selectedPoll, data } = this.props;
        const poll = selectedPoll ? selectedPoll : data;
        return (
                <div>
                <div className="poll-selected-container">
                    { poll ?
                    <div className="poll-details">
                        <h2> {poll[0].title}</h2> 
                        <div className="poll-vote-action">
                            <div className="poll-choices-wrapper">
                                <h5> I am voting for </h5>
                                <select onChange={this.onChangeHandle} value={selection}>
                                <option value="Select Choice" hidden>Select Choice</option>
                                    { poll[0].options.map((item, index) => (
                                        <option value={item.key} key={index}>{item.key}</option>
                                      ))
                                    }
                                </select>
                            </div>
                            <div className="poll-btn-wrapper">
                                <button onClick={this.vote}> Vote </button>
                            </div>
                        </div>
                        <PieChart width={300} height={200}>
                              	<Pie data={poll[0].options} cx="50%" cy="50%" dataKey="votes" label={true} labelLine={true}>
                                  	{
                                  		poll[0].options.map((entry, index) => (
                                  			<Cell name={entry.key} key={index} fill={COLORS[index % COLORS.length]}  />
                                  		))
                                  	}
                                </Pie>
                              <Tooltip />
                          <Legend />
                        </PieChart>
                      </div>
                            : 
                        <p> Loading... </p> }
                    </div>
        
                </div>
            
            )
    }
}