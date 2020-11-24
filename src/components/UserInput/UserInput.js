import React from 'react';

import './UserInput.css';

const userInput = (props) => {
    return (
        <input className="UserInput" type="text" value={props.username} onChange={props.changed} />
    )

}

export default userInput;

