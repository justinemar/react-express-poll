import React from 'react';




class Login extends React.Component{
    
    
    
    
    onAuth = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        fetch('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({email: email , password: password}),
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }
    render(){
        return (
        <div className="form-container">
            <h1> Register </h1>
            <form onSubmit={this.onAuth}>
                <input type="email" name="email" placeholder="johndoe@mail.com"/>
                <input type="password" name="password"/>
                <button>Submit</button>
            </form>
        </div>
            )
    }
}


export default Login;