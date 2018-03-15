import React from 'react';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import NewPoll from './NewPoll';
import Cookies from 'js-cookie';

class App extends React.Component{
  //TODO: Send signal for authorization 
    componentDidMount(){
        fetch('/api/checkAuth', {
            method: 'POST',
            credentials: 'same-origin',
            body: {},
            headers: {'Content-Type': 'text/plain', 'Content-length': 0}
        })
        .then(res => {
            console.log(res)  
        })
        .catch(err => console.log(err))
    }
    
    render(){
      const HeaderRoute = withRouter(Header);
      const {match} = this.props
        return (
        <div>
          <HeaderRoute/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <ProtectedRoute path="/home" component={Home}/>
          <ProtectedRoute path="/newpoll" component={NewPoll}/>
        </div>
            );
    }
}


const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => Cookies.get('session')
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}


export default App;