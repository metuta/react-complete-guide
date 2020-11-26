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

    componentDidMount() {
        // this.inputElement.focus(); // ref-element, created with 1. way
        this.inputElementRef.current.focus();  // ref-element, created with 2. way
    }

    render() {
        console.log('[Person.js] rendering...');

        return (
            <React.Fragment>
                <AuthContext.Consumer>
                    {context => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                </AuthContext.Consumer>
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