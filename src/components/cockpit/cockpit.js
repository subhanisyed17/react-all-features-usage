import React, { useEffect, useRef, useContext } from 'react'
import classes from './cockpit.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);
  console.log("Context Value from Cockpit.js", authContext);

  // Below UseEffect runs only for the first time and 
  //return causes the clean up of the component when it is about to unmount
  useEffect(() => {
    console.log("[CockPit.js] UseEffect")
    toggleBtnRef.current.click();
    // some code
    //   setTimeout(() => {
    //     alert('I did some work');
    // },1000)
    return(() => {
      console.log("[Cockpit.js] UseEffect Cleanup")
    })
  },[]);

  // Below UseEffect runs only when there is a change in the number of Perosns (pers)

  useEffect(() =>{
    console.log("[cockpit.js] UseEffect called by change in pers");
  },[props.persLength])

  let styleButton = [classes.Button]

  if(props.showperson){
    styleButton.push(classes.Red)
  }

  let style = []
  if(props.persLength <=2){
    style.push(classes.red);
  }
  if(props.persLength <=1){
    style.push(classes.font);
  }

    return(
        <div className= {classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={style.join(' ')}>This app is really working !</p>
        <button ref = {toggleBtnRef} className ={styleButton.join(' ')} onClick = {props.toggle}>
          Toggle Persons
        </button>
        <button onClick = {authContext.login} >Log in</button>
        </div>
    )
}

export default React.memo(Cockpit);