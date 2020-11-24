import React, { Component } from 'react';
// import styled from 'styled-components';
// import Validation from './Validation/Validation';
// import Char from './Char/Char';
import Person from './Person/Person';
// import UserInput from './UserInput/UserInput';
// import UserOutput from './UserOutput/UserOutput';
import classes from './App.css';

// const StyledButton = styled.button`
//   background-color: ${props => props.show ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => props.show ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

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

  usernameChangedHandler = (event) => {
    this.setState({
      username: event.target.value
    });
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
    this.setState({ persons });
  }

  inputTextChangedHandler = (event) => {
    this.setState({ inputText: event.target.value });
  }

  deleteCharHandler = (index) => {
    console.log('deleteCharHandler');
    let chars = this.state.inputText.split('');
    chars.splice(index, 1);
    this.setState({ inputText: chars.join('') });
  }

  render() {
    
    // let chars = (
    //   <div>
    //     {
    //       this.state.inputText.split('').map((c, idx) => {
    //         return <Char clicked={() => this.deleteCharHandler(idx)} chr={c} key={c} />
    //       })
    //     }
    //   </div>
    // );

    let persons = null;

    let btnClass = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person key={person.id}
                clicked={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              >{person.id}</Person>
            })
          }
        </div>
      );

      btnClass.push(classes.Red);
    }

    let assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass.join(' ')} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}

        {/* <p>------</p>
        <UserInput username={this.state.username} changed={this.usernameChangedHandler} />
        <UserOutput username={this.state.username} />
        <UserOutput username={this.state.username} />
        <UserOutput username="Tugrul" /> 
        
        <input type="text" value={this.state.inputText} onChange={(event) => this.inputTextChangedHandler(event)} />
        <p>{this.state.inputText}</p>
        <Validation textLength={this.state.inputText.length} />
        {chars}        
        */}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!!!'));
  }

}

export default App;