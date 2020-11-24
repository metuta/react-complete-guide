import React from 'react';

const char = (props) => {
    const style = {
        display: 'inline-block',
        textAlign: 'center',
        padding: '16px',
        margin: '16px',
        border: '1px solid black'
    }
    return (
        <p style={style} onClick={props.clicked}>{props.chr}</p>
    );
}

export default char;