import React, { PureComponent } from 'react';
import Person from './Person/Person';


class Persons extends PureComponent{

        // static getDerivedStateFromProps = (props,state) => {
        //         console.log("[Persons.js] getDerviedStateFromProps");
        //         return state;
        // }

        /* when we want to check whether there is a change in
        each and every element of the props, then we should not use
        shouldComponentUpdate method, instead we should a PureComponent
        (which by default implements shouldComponentUpdate) in place of Component*/

        // shouldComponentUpdate = (nextProps, nextState) =>{
                
        //         if(nextProps.pers !== this.props.pers ||
        //            nextProps.changed !== this.props.changed ||
        //            nextProps.clicked !== this.props.clicked ){
        //         console.log("[Persons.js] shouldComponentUpdate");
        //         return true;
        //         }
        //         else
        //         console.log("[Persons.js] shouldComponentUpdate : NO");
        //                 return false;
        // }

        getSnapshotBeforeUpdate = (previousProps, previuosState) =>{
                console.log("[Persons.js] getSnapshotBeforeUpdate");
                return {message : "Snapshot is Created and Used"}
        }

        componentDidUpdate = (previousProps, previuosState,snapshot) =>{
                console.log("[Persons.js] componentDidUpdate");
                console.log(snapshot);

        }

        componentWillUnmount = () =>{
                console.log("[Persons.js] componentWillUnmount");
        }

        render(){
                console.log("[App.js] Person is renderring");
                return this.props.pers.map((p,index) => {
                        return  <Person
                                click = {this.props.clicked.bind(index)}
                                name = {p.name}
                                age = {p.age}
                                key = {p.id}
                                changed = {(event) => this.props.changed(event,p.id)}/>
        
                });
        }
        

} 


export default Persons