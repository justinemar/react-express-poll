import React from 'react';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Register from './Register/index';
import Login from './Login/index';
import NewPoll from './NewPoll/index';
import Loading from './Widget/Loading.jsx';
import Polls from './Polls';
import MyPolls from './MyPolls';
import PublicPolls from './PublicPolls';

class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        valid: false,
        loading: true,
        email: null
      };
    }
    
    
    
    componentDidMount(){
        fetch('/api/checkAuth', {
            method: 'POST',
            credentials: 'same-origin',
            body: {},
            headers: {'Content-Type': 'text/plain', 'Content-length': 0}
        }).then(res => res.json())
        .then(res => {
            if(res.valid){
                this.setState({
                  valid: true,
                  loading: false,
                  email: res.email
                })
            } else {
              this.setState({
                valid: false,
                loading: false
              });
            }
        })
        .catch(err => err);
        this.renewData();
    }
    
    
    
    renewData = () => {
      this.forceUpdate();
      fetch('/api/polls', { method: 'GET', credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            this.setState({
                polls: res
            })
        }).catch(err => err);
    }
    
    authUser = () => {
      this.setState({
        valid: true
      });
    }
    
    unAuthUser = (cb) => {
      this.setState({
        valid: false
      }, cb());
    }
    

    render(){
      const HeaderRoute = withRouter(Header);
      const {valid, loading, polls, email} = this.state;
        return (
        <div>
      {loading ?
        <Loading/> : null }
          <HeaderRoute valid={valid} unAuthUser={this.unAuthUser}/>
          <Route exact path="/polls" render={(props) => <Polls polls={polls} {...props}/>}/>
          <Route path="/polls/:poll" render={(props) => <PublicPolls email={email} polls={polls} renewData={this.renewData} {...props}/>}/>
          <Route path="/register" component={Register}/>
          <Route path="/login"  render={(props) => <Login authUser={this.authUser} valid={valid} {...props}/>} />
          <ProtectedRoute valid={valid} path="/mypolls" component={MyPolls}/>
          <ProtectedRoute renewData={this.renewData} valid={valid} path="/newpoll" component={NewPoll}/>
        </div>
            );
    }
}


const ProtectedRoute = ({component: Component, valid, renewData,...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => valid
        ? <Component valid={valid} renewData={renewData} {...props}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  );
};

export default App;