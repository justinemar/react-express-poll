import React from 'react';




export const LoginControl = ({email, password}) => {
    return (
        <div>
            <input type="email" name="email" placeholder="Johndoe@mail.com" 
                    ref={email}/>
            <input type="password" name="password" placeholder="Password" 
                    ref={password} />
        </div>
        )
}