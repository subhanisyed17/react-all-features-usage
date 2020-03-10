import React, { Component } from 'react';
import CSSClasses from './App.css';
import Cockpit from '../components/cockpit/cockpit';
import Persons from '../components/Persons/Persons';
import styled from 'styled-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import WithClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';


class App extends Component {
  constructor(props){
    super(props);
    console.log("[App.js] Constrcutor");
  }

  state = {
    persons: [
              {id : 1,name :"Subhani", age:"25"},
              {id: 2,name : "Scott Allen", age :"Died"},
              {id: 3,name : "David Guetta", age: "45"}
    ],
    showPersons : false,
    showCockpit : true,
    changeCounter : 0,
    isAuthenticated : false
  }

  static getDerivedStateFromProps= (props,state) =>{
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  switchNameHandler = (updateAge) =>{
    //console.log("Switch Name Button was Clicked");
    // You CANNOT change the state directly as shown below, we need to use set state
    //this.state.persons[0].name = "Subhani Syed";

    this.setState({
      persons : [
              {name : "Subhani Syed", age: "25"},
              {name : "Scott Allen", age : updateAge},
              {name : "Atif Aslam", age: "34"}
      ]
    })
  }

  toggleHandler = () =>{
    this.setState({
      showPersons : !this.state.showPersons
    })
  }

  loginHandler = () =>{
    this.setState({isAuthenticated : true})
  }


  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {return p.id === id;})
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person


    this.setState((prevState,props) =>{
      return {
        persons: persons,
        changeCounter : prevState.changeCounter +1
      }
  })
}

deletePersonHandler = (index) =>{

    const newPersons = [...this.state.persons]
    newPersons.splice(index,1)
    this.setState({
      persons : newPersons
    })
}

componentDidMount = () =>{
  console.log("[App.js] ComponentDidMount");
}

shouldComponentUpdate = (nextProps, nextState) => {
  console.log("[App.js] ShouldComponentUpdate");
  return true;
}

componentDidUpdate = () =>{
 console.log("[App.js] ComponentUpdated"); 
}

componentWillUnmount = () =>{
  console.log("[App.js] componentWillUnmount");
}

  render() {
    console.log("[App.js] Render");

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          <Persons
            pers = {this.state.persons}
            clicked = {this.deletePersonHandler}
            changed = {this.nameChangeHandler}/>
        </div>
      );
      }
      
    return (
      <Aux>
        <button className = {CSSClasses.App} onClick = {() => this.setState({showCockpit : false})} >
          Remove Cockpit
        </button>
        <AuthContext.Provider value = {{
          authenticated : this.state.isAuthenticated,
          login : this.loginHandler
        }}
        >
        {
          this.state.showCockpit ?
          (
          <Cockpit
          title = {this.props.appTitle}
          showperson = {this.state.showPersons}
          persLength = {this.state.persons.length}
          toggle = {this.toggleHandler}
          login = {this.loginHandler}/>)
          : null
        }
        {persons}
        </AuthContext.Provider>
      </Aux>
      
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Does This Work Now ?'));
  }
}

export default withClass(App, CSSClasses.App);
