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
                        message: res.message
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
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const properEmail = regEmail.test(email) ? null : 'Email is invalid!';
            this.setState({
                validate: {
                    message: properEmail
                }
            })
        } else if(e.target.name == 'confirm_password'){
            const password = e.target.value;
            const passed = password === this.confirmPass.value ? null : "Password doesn't match!"
            this.setState({
                validate: {
                    message: passed
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
            <h1> Register </h1>
            <form onSubmit={this.onAuth}>
            {validate.message ? 
                <p className="error-p">Error: {validate.message}</p>
                :
                null
            }
                <input type="email" name="email" placeholder="johndoe@mail.com" onChange={this.onHandleChange}/>
                <input type="password" name="password" ref={(input) => this.confirmPass = input}/>
                <input type="password" name="confirm_password" onChange={this.onHandleChange}/>
                <button>Submit</button>
            </form>
        </div>
            )
    }
}


export default Register;