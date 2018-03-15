import React from 'react';
import Cookies from 'js-cookie';




class Login extends React.Component{
    state = {
        validate: {
            message: null
        }
    }
    
    componentWillMount(){
        if(Cookies.get('session'))
            this.props.history.push('/home')
    }
    
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
            if(res.authed){
                this.props.history.push("/home")
            } else {
                this.setState({
                    validate: {
                        message: res.message
                    }
                })
            }
            
            return res;
        }).catch(err => console.log(err));
    }
    
    render(){
        const { validate } = this.state;
        return (
        <div className="form-container">
            <h1> Login </h1>
            <form onSubmit={this.onAuth}>
            { validate.message ? 
                <p className="error-p">Error: {validate.message}</p>
                :
                null
            }
                <input type="email" name="email" placeholder="Johndoe@mail.com"/>
                <input type="password" name="password" placeholder="Password"/>
                <button>Submit</button>
            </form>
        </div>
            )
    }
}


export default Login;