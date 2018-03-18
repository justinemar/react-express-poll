import React from 'react';
import Spinner from './Spinner.gif';
import { Link } from 'react-router-dom';



export default class MyPolls extends React.Component{
    
    // state = {
    //     pollData: null
    // }
    
    componentDidMount(){
        // fetch('/api/mypolls', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     body: {},
        //     headers: {'Content-Type': 'text/plain', 'Content-length': 0}
        // }).then(res => res.json())
        // .then(res => {
        //     if(res){
        //       this.setState({
        //         pollData: res
        //       })
        //     } else {
        //       this.setState({
        //         pollData: null
        //       })
        //     }
        // })
        // .catch(err => console.log(err))
    }
    
    render(){
        const { match, polls } = this.props;
        const userPolls = polls ? polls.map(i => {
            const slug = i._id;
            return (
               <Link to={`polls/${slug}`} params={{data: 'test'}}>
                    <div className="poll-container">
                        <h2> { i.title } </h2>
                    </div>
               </Link>
                )
        }) : <img src={Spinner}/>
        return (
            <div>
                <h1> My Polls </h1>
                {userPolls}
            </div>
            )
    }
}