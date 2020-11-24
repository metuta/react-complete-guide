import React from 'react';

const userOutput = (props) => {
    const style = {
        backgroundColor: '#fafafa',
        margin: '10px auto',
        width: '80%',
        border: '1px solid black',
        padding: '8px',
        boxShadow: '0 2px 3px #ccc'
    };
    return (
        <div style={style}>
            <p>Username: {props.username}</p>
            <p>Some text paragraph 1</p>
            <p>Some text paragraph 2</p>
        </div>
    );
}

export default userOutput;