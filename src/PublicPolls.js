import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';





export default class PublicPolls extends React.Component {
    state = {
        selection: null
    }
    
    
    
    render(){
        const { match, polls } = this.props;
        const { selection } = this.state;
        const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];
        const selectedPoll = polls ? polls.filter(i => i._id === match.params.poll) : null;
        return (
    <div className="poll-selected-container">
            { selectedPoll ?
            <div className="poll-details">
                <h2> {selectedPoll[0].title}</h2> 
                <div className="poll-vote-action">
                    <div className="poll-choices-wrapper">
                        <h5> I am voting for </h5>
                        <select onChange={this.onChangeHandle} value={selection}>
                          <option value="" selected disabled hidden>Select Choice</option>
                            { selectedPoll[0].options.map((item, index) => (
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
                      	<Pie data={selectedPoll[0].options} cx="50%" cy="50%" dataKey="votes" label={true} labelLine={true}>
                          	{
                          		selectedPoll[0].options.map((entry, index) => (
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
            )
    }
}
