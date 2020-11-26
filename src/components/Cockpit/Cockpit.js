import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect only mount');

        // setTimeout(() => {
        //     alert('Saved data to cloud!');
        // }, 1000);
    }, []); // empty array -> runs only first time on mount, because there is no dependency to reload

    useEffect(() => {
        console.log('[Cockpit.js] useEffect only for props.persons');
    }, [props.persons]); // would reload only, when persons-property changes!

    useEffect(() => {
        console.log('[Cockpit.js] useEffect only for props.show');
    }, [props.show]); // would reload only, when show-property changes!

    const assignedClasses = [];
    const btnClass = [classes.Button];

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    if (props.show) {
        btnClass.push(classes.Red);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass.join(' ')} onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;