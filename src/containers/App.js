import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {
  state = {
    persons: [
      { id: 'abc', name: 'Tugrul', age: 38 },
      { id: 'def', name: 'Ali', age: 30 },
      { id: 'ghi', name: 'Veli', age: 23 }
    ],
    username: 'myUser1',
    showPersons: false,
    inputText: ''
  };

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
    this.setState({ persons });
  }

  deleteCharHandler = (index) => {
    console.log('deleteCharHandler');
    let chars = this.state.inputText.split('');
    chars.splice(index, 1);
    this.setState({ inputText: chars.join('') });
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          show={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }

}

export default App;