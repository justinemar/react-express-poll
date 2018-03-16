import React from 'react';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import NewPoll from './NewPoll';
import Cookies from 'js-cookie';

class App extends React.Component{
    constructor(props){
      super(props)
      this.state = {
      valid: false
    }
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
                valid: res.valid
              })
            } else {
              this.setState({
                valid: false
              })
            }
        })
        .catch(err => console.log(err))
    }
    
    authUser = (cb) => {
      this.setState({
        valid: true
      })
    }
    
    unAuthUser = (cb) => {
      this.setState({
        valid: false
      }, cb())
    }
    
    render(){
      const HeaderRoute = withRouter(Header);
      const {valid} = this.state;
        return (
        <div>
          <HeaderRoute valid={valid} unAuthUser={this.unAuthUser}/>
          <Route path="/register" component={Register}/>
          <LoginRedir path="/login" component={Login} authUser={this.authUser} valid={valid}/> 
          <ProtectedRoute valid={valid} path="/home" component={Home}/>
          <ProtectedRoute valid={valid} path="/newpoll" component={NewPoll}/>
        </div>
            );
    }
}


const ProtectedRoute = ({component: Component,valid, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => valid
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}

const LoginRedir = ({component: Component,valid, authUser, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => valid === false
        ? <Component valid={valid} authUser={authUser} {...props} />
        : <Redirect to={{pathname: '/home', state: {from: props.location}}} />} />
  )
}

export default App;