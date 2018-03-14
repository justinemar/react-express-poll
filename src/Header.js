import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    render(){
        return (
            <header>
                <h3>React Poll</h3>
                <div className="actions-bar">
                    <Link to="/home">Home</Link>
                    <Link to="/register">Register</Link>
                </div>
            </header>
            )
    }
}


export default Header;