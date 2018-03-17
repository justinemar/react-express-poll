import React from 'react';





export default class PollForm extends React.Component{
    render(){
        const { validate, pollOptions, pollTitle, submitFunc } = this.props;
        return (
            <div className="form-container">
                <h1> Add new Poll </h1>
                <form onSubmit={submitFunc}>
                { validate.message ? 
                        <p className={validate.className}>{validate.message}</p>
                        :
                        null}
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" ref={pollTitle}/>
                    <label htmlFor="poll-options"> Poll Options (seperate by comma) </label>
                    <input type="text" name="poll-options" ref={pollOptions}/>
                    <button> Create Poll </button>
                </form>
            </div>
            )
    }
}