import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './Person.css';

class Person extends Component {

    render() {
        console.log('[Person.js] rendering...');

        return (
            <Auxiliary>
                <p onClick={this.props.clicked}> I'am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Auxiliary>
        );
    }
}

export default Person;