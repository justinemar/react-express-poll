import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
class Header extends React.Component{
    state = {
        authed: Cookies.get('session') || false
    }
    
    render(){
        const { authed } =  this.state;
        return (
            <header>
                <h3>React Poll</h3>
                <div className="actions-bar">
                    <Link to="/home">Home</Link>
                    { authed ? <button>Logout</button> :
                    <div>
                        <Link to="/register">Register</Link> 
                        <Link to="/login">Login</Link>
                    </div>
                    }
                </div>
                <div className="clearfix"></div>
            </header>
            )
    }
}


export default Header;