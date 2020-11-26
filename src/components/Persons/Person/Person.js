import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../../context/auth-context';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef(); // 2. way to create ref (more modern and usable in functional components over react hooks too)
    }

    static contextType = AuthContext;   // works only in class-based components and should exactly be defined as here, so this.context can be used.

    componentDidMount() {
        // this.inputElement.focus(); // ref-element, created with 1. way
        this.inputElementRef.current.focus();  // ref-element, created with 2. way
        console.log('[Person.js] componentDidMount', this.context.authenticated);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('[Person.js] componentDidUpdate', this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');

        return (
            <React.Fragment>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                <p onClick={this.props.clicked}> I'am {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    // ref={(inputEl) => {this.inputElement = inputEl}}  // 1. way to create and set ref (not usable in functional components)
                    ref={this.inputElementRef}  // setting ref created with 2. way
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </React.Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);