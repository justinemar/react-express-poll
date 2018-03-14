import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Register from './Register';

class App extends React.Component{
    render(){
        return (
        <div>
        <Header/>
            <Switch>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
            )
    }
}


export default App;