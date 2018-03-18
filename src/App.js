import React from 'react';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Register from './Register/index';
import Login from './Login/index';
import Home from './Home';
import NewPoll from './NewPoll/index';
import Cookies from 'js-cookie';
import Loading from './Widget/Loading.jsx';
import Polls from './Polls';
import MyPolls from './MyPolls';
import Poll from './Poll';

class App extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        valid: false,
        loading: true,
      }
    }
    componentWillMount(){
        fetch('/api/checkAuth', {
            method: 'POST',
            credentials: 'same-origin',
            body: {},
            headers: {'Content-Type': 'text/plain', 'Content-length': 0}
        }).then(res => res.json())
        .then(res => {
            if(res.valid){
              this.setState({
                valid: res.valid,
                loading: false
              })
          fetch('/api/mypolls', {
                method: 'POST',
                credentials: 'same-origin',
                body: {},
                headers: {'Content-Type': 'text/plain', 'Content-length': 0}
            }).then(res => res.json())
            .then(res => {
                if(res){
                  this.setState({
                     ...res
                  })
                } else {
                  this.setState({
                    pollData: null
                  })
                }
            }).catch(err => console.log(err))
            } else {
              this.setState({
                valid: false,
                loading: false
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
      const {valid, loading, polls} = this.state;
        return (
        <div>
      {loading ?
        <Loading/> : null }
          <HeaderRoute valid={valid} unAuthUser={this.unAuthUser}/>
          <Route path="/polls" exact component={Polls}/>
          <Route path="/polls/:poll" render={(props) => <Poll  polls={polls} {...props}/>}/>
          <Route path="/register" component={Register}/>
          <Route path="/login"  render={(props) => <Login authUser={this.authUser} valid={valid} {...props}/>} />
          <Route path="/mypolls" render={(props) => <MyPolls valid={valid} polls={polls} {...props}/>}/>
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

export default App;