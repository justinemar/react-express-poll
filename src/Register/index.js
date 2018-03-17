import React from 'react';
import '../index.css';
import {Form} from '../Form';

class Register extends React.Component{
    state = {
        validate: {
            message: null,
            className: null
        }
    }
    
    
    
    onRegister = (e) => {
        e.preventDefault();
        const email = this.email.value
        const password = this.password.value
        if(!this.state.validate.message){
            fetch('/api/register', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({email: email , password: password}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    validate: {
                        message: res.message,
                        className: res.type
                    }
                })
                return res;
            })
            .catch(err => console.log(err))
        }
    }
    
    onHandleChange = (e) => {
        if(e.target.name === 'email'){
        const email = e.target.value;
        //client validation
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const properEmail = regEmail.test(email) ? null : 'Email is invalid!';
            this.setState({
                validate: {
                    message: properEmail,
                    className: 'error-p'
                }
            })
        } else if(e.target.name == 'confirm_password'){
            const password = e.target.value;
            const passed = password === this.password.value ? null : "Password doesn't match!"
            this.setState({
                validate: {
                    message: passed,
                    className: 'error-p'
                }
            })
        } else {
            return false;
        }
    }
    
    render(){
        const { validate } = this.state;
        return (
        <div className="form-container">
        <Form h1="Register" 
            email={i => this.email = i}
                password={i => this.password = i} funcInit={this.onRegister}
                    err={validate} handleChange={this.onHandleChange}
                    />
        </div>
            )
    }
}


export default Register;