import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import './Poll.css';

export default class Poll extends React.Component{
    
    state = {
        selection: undefined
    }
    
    vote = () => {
        fetch('/api/vote', {
            method: 'POST',
            body: JSON.stringify(this.state.selection),
            headers: {'Content-Type': 'text/plain'},
        }).then(res => res.json())
        .then(res => {
            this.forceUpdate();
        }).catch(err => console.log(err));
    }
    
    onChangeHandle = (e) => {
        this.setState({
            selection: e.target.value
        })
    }
    
    render(){
        const { polls } = this.props;
        const { selection } = this.state;
        const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];
        const data = polls ? polls.filter(i => i._id === this.props.match.params.poll) 
            : 
        null;
        return(
            <div className="poll-container">
            { data ?
            <div className="poll-details">
                <h2> {data[0].title}</h2> 
                <div className="poll-vote-action">
                    <div className="poll-choices-wrapper">
                    <h5> I am voting for </h5>
                        <select onChange={this.onChangeHandle} value={selection}>
                            { data[0].options.map((item, index) => (
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
                      	<Pie data={data[0].options} cx="50%" cy="50%" dataKey="votes" label={true} labelLine={true}>
                          	{
                          		data[0].options.map((entry, index) => (
                          			<Cell name={entry.key} key={entry.key} fill={COLORS[index % COLORS.length]}  />
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
            );
    }
}