import React from 'react';
import {RegisterControl} from './RegisterControl';
import {LoginControl} from './LoginControl';




export class Form extends React.Component {
    render(){
        const {h1, err, funcInit, email, password, handleChange} = this.props;
        return (
        <div className="form-container">
            <h1> {h1} </h1>
            <form onSubmit={funcInit}>
            { err.message ? 
                <p className="error-p">Error: {err.message}</p>
                :
                null
            }
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