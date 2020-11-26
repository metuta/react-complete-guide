import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect only mount - []');
        toggleBtnRef.current.click();

        const timer = setTimeout(() => {
            console.log('[Cockpit.js] setTimeout() Saved data to cloud!');
        }, 1000);

        return () => {  // does cleanup work, only when component is destroyed (as in componentWillUnmount lifecycle hook of class-based components)
            clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect on onUnmount - []');
        }
    }, []); // empty array -> runs once only first time on mount/unmount, because there is no dependency to reload

    useEffect(() => {
        console.log('[Cockpit.js] useEffect on every render - no array');

        return () => {  // does cleanup work "before every render" of this component, because there is no array-argument
            console.log('[Cockpit.js] cleanup work in useEffect before every render - no array');
        }
    }); // no array -> runs on every render

    useEffect(() => {
        console.log('[Cockpit.js] useEffect only for props.personsLength - [props.personsLength]');
    }, [props.personsLength]); // would reload only, when persons-property changes!

    useEffect(() => {
        console.log('[Cockpit.js] useEffect only for props.show - [props.show]');
    }, [props.show]); // would reload only, when show-property changes!

    const assignedClasses = [];
    const btnClass = [classes.Button];

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    if (props.show) {
        btnClass.push(classes.Red);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass.join(' ')}
                onClick={props.clicked}>
                Toggle Persons
            </button>
            {authContext.authenticated ? <button onClick={authContext.logout}>Log out</button> : <button onClick={authContext.login}>Log in</button>}
        </div>
    );
};

export default React.memo(cockpit); // memo stores the props of functional components to avoid unnecessary updates