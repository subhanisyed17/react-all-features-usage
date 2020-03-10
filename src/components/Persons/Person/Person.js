import React, { Component } from 'react';
import CSSClasses from  './Person.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';


class person extends Component {
    constructor(props){
        super(props)
       this.inputElementRef = React.createRef()
    }

    static contextType = AuthContext;

    componentDidMount(){
        this.inputElementRef.current.focus();
        console.log("from Person.js", this.context.authenticated);
    }

    render(){
        console.log("[App.js] person is renderring");
        return (
            
            <Aux>
            {this.context.authenticated ? <p>Authenticated !</p> : <p>Please Login</p>} 
            <p onClick = {this.props.click}>{this.props.name} - {this.props.age} Years Old</p>
            <p>{this.props.children}</p>
            <input 
                key = "i3"
                ref = {this.inputElementRef}
                type = "text" 
                onChange = {this.props.changed} 
                value = {this.props.name} 
            />
            </Aux>
            
        )
        
    }
}

person.prTypes = {
    click : PropTypes.func,
    name : PropTypes.string,
    age : PropTypes.number,
    changed : PropTypes.func
};

export default withClass(person, CSSClasses.Person);