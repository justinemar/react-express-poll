import React from 'react';
import LoadingStyle from './Loading.css';
import Spinner from '../Spinner.gif';

const Loading = () => {
    const qt = ['My doggie is better than your doggie', 'ming ming ming ming ming']
    return (
        <div className="loading-container">
            <img src={Spinner} width="350px" height="250px"/>
        </div>
    )    
} 

export default Loading;