import React from 'react';
import {RegisterControl} from '../Register/RegisterControl';
import {LoginControl} from '../Login/LoginControl';
import '../index.css';



export class Form extends React.Component {
    render(){
        const {h1, err, funcInit, email, password, handleChange} = this.props;
        return (
        <div className="form-container">
            <h1> {h1} </h1>
            <form onSubmit={funcInit}>
                            { err.message ? 
                        <p className={err.className}>{err.message}</p>
                        :
                        null}
                    { handleChange ? 
                        <RegisterControl email={email} 
                        password={password} 
                            handleChange={handleChange}
                                />
                            : 
                        <LoginControl email={email} password={password}/>
                    }
                <button>Submit</button>
            </form>
        </div>
            )
    }
}