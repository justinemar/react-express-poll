import React from 'react';
import Cookies from 'js-cookie';
import {Form }from '../Form';



class Login extends React.Component{
    state = {
        validate: {
            message: null,
            className: null
        }
    }
    
    
    componentWillReceiveProps(props){
        const { history , location } = this.props;
        const redirTo = location.state !== undefined ? location.state.from.pathname : '/public';
            history.replace({
                pathname: redirTo
            })
    }

    init = () => {
        const { history } = this.props;
        const { authUser } = this.props;
        const email = this.email.value
        const password = this.password.value
       fetch('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({email: email , password: password}),
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        .then(res => {
            if(res.authed){
                authUser()
                history.push('/home');
            } else {
                this.setState({
                    validate: {
                        message: res.message,
                        className: res.type
                    }
                })
            }
        }).catch(err => console.log(err));
    }
    
    onAuth = (e) => {
        e.preventDefault();
        const { authUser } = this.props;
        this.init();
    }
    
    render(){
        const { validate } = this.state;
        return (
        <Form h1="Login" email={i => this.email = i} 
            password={i => this.password = i} funcInit={this.onAuth}
                err={validate}/>
            )
    }
}


export default Login;