import React from 'react';




export const RegisterControl = ({email, password, handleChange}) => {
    return (
        <div>
            <input type="email" name="email" placeholder="Johndoe@mail.com" 
            ref={email} onChange={handleChange}/>
            
            <input type="password" name="password" placeholder="Password" 
            ref={password} />
            
            <input type="password" placeholder="Confirm Password" name="confirm_password" 
            onChange={handleChange}/>
        </div>
        )
}

