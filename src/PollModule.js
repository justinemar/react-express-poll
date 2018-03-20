import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';



export default class PollModule extends React.Component{
    
    
    state = {
        selection: undefined,
        initOption: false,
        polls: null
    }
    
    componentDidUpdate(){
        console.log('updat')
    }
    
    vote = (e) => {
        const pollID = this.props.match.params.poll
        const vote = this.state.initOption ? this.option.value : this.state.selection;
        fetch('/api/vote', {
            method: 'POST',
            body: JSON.stringify({ vote: vote, pollID: pollID }),
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
          this.props.renewData();
          this.forceUpdate();
        }).catch(err => console.log(err));
    }
    
    onChangeHandle = (e) => {
        if(e.target.value === 'create-option'){
            this.setState({
                initOption: true,
                selection: null
            })   
        } else {
            this.setState({
                initOption: false,
                selection: e.target.value
            })   
        }
    }
    render(){
        const COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF', '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        const { selection, initOption } = this.state;
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
                                <option value="create-option">New Option</option>
                                </select>
                                { initOption ?
                                <div className="new-option">
                                    <p> Vote with my own option: </p>
                                    <input type="text" ref={(input) => this.option = input} placeholder="Enter your option"/>
                                </div> : null }
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