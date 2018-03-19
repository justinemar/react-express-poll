import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
class Header extends React.Component{
    
    init = () => {
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'same-origin',
            body: {},
            headers: {
                'Content-type': 'application/json' ,
                'Content-length': 0
            }
        })
            .then(res => res.json())
                .then(res => {
                    return true;
                })
            .catch(err => console.log(err))
    }
    logOut = () => {
        const { unAuthUser } = this.props;
        unAuthUser(this.init)
    }
    render(){
        const { valid } = this.props;
        return (
            <header>
                <h3>React Poll</h3>
                <div className="actions-wrapper">
                    <Link to="/polls">Home</Link>
                    { valid
                        ?
                        <div className="actions-bar">
                            <Link to="/mypolls">My Polls</Link>
                            <Link to="/newpoll">Create Poll</Link>
                            <button onClick={this.logOut}>Logout</button>
                        </div>
                        :
                            <div className="actions-bar">
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