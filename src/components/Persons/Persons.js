import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps', props, state);

    //     return state;
    // }

    /* PureComponent implements a shallow comparison on props and state (shouldComponentUpdate)
    and returns true if any props or states have changed. */
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.persons !== this.props.persons) {
    //         console.log('[Persons.js] shouldComponentUpdate', nextProps, this.props, nextState);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate', prevProps, prevState);

        return { message: 'Snapshot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate', prevProps, prevState, snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');

        return this.props.persons.map((person, index) => {
            return <Person
                key={person.id}
                clicked={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.props.changed(event, person.id)} />
        });
    }
}

export default Persons;