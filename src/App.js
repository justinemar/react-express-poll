import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

class App extends React.Component{
    render(){
        return (
        <div>
        <Header/>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
            );
    }
}


export default App;