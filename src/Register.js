import React from 'react';
import './index.css';

class Register extends React.Component{
    state = {
        validate: {
            message: null
        }
    }
    
    
    
    onAuth = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
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
                    message: res.message
                }
            })
        })
        .catch(err => console.log(err))
    }
    
    onHandleChange = (e) => {
        const email = e.target.value;
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const properEmail = regEmail.test(email) ? null : 'Email is invalid!';
        this.setState({
            validate: {
                message: properEmail
            }
        })
    }
    render(){
        const { validate } = this.state;
        return (
        <div>
            <h1> Register </h1>
            <form onSubmit={this.onAuth}>
            <p className="error-p">{validate.message}</p>
                <input type="email" name="email" placeholder="johndoe@mail.com" onChange={this.onHandleChange}/>
                <input type="password" name="password"/>
                <input type="password" name="password_confirmation"/>
                <button>Submit</button>
            </form>
        </div>
            )
    }
}


export default Register;