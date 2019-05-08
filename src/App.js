import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Max', age: '29'},
      {id: '2', name: 'Maxi', age: '28'},
      {id: '3', name: 'Jelly', age: '25'},
    ],
    showPersons: false
  }
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render () {
    const style = {
      background: 'green',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index )=> {
            return <Person
              key={person.id}
              click={()=> this.deletePersonHandler(index)}
              name={person.name} 
              changed={(event) => this.nameChangedHandler(event, person.id)}
              age={person.age}/>
          })}
        </div>
      );
      style.background = 'red';
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <=1) {
      classes.push('bold');
    }
    return (
        <div className="App">
          <h1>Hello! I am Robin</h1>
          <p className={classes.join(' ')}>Is this really working?</p> 
          <button 
            onClick={this.togglePersonsHandler}
            style={style}
            >Click Me</button>
          { persons }
        </div>
    );
  }
}

export default App;
