import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'abc', name: 'Tugrul', age: '38' },
      { id: 'def', name: 'Ali', age: 30 },
      { id: 'ghi', name: 'Veli', age: 23 }
    ],
    username: 'myUser1',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    inputText: ''
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props, state);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate', nextProps, nextState);

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate', prevProps, prevState, snapshot);
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    console.log('delete', index, persons);
    this.setState({ persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    // this.setState({ persons });        // correct way, if new state is NOT based on old state 
    this.setState((prevState, props) => { // correct way, if new state is based on old state
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deleteCharHandler = (index) => {
    console.log('deleteCharHandler');
    let chars = this.state.inputText.split('');
    chars.splice(index, 1);
    this.setState({ inputText: chars.join('') });
  }

  render() {
    console.log('[App.js] render');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <Auxiliary>
        <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}>Remove Cockpit</button>
        { this.state.showCockpit ?
          <Cockpit
            title={this.props.appTitle}
            show={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler} />
          : null
        }
        {persons}
      </Auxiliary>
    );
  }

}

export default withClass(App, classes.App);