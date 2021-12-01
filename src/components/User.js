import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import {BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // background:"red",
      },
    },
  }));
function User(props) {

 
    const classes = useStyles();
    //console.log(props.users)
    //------------------------------------------------
    // Login-Formular
    const [loginData, setLoginData] = useState({
        username: "",
        passwort: ""
    })
    // Login
    function eingeben(event) {
        setLoginData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }
    
    function checkLoginData(){
        const loggedInUser = props.users.find((value) => {
            return value.username === loginData.username && 
                value.password === loginData.passwort
        })
        if (loggedInUser) {
            // props.setUser(loggedInUser)
            props.setLogin(true)
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
            
        } else {
            setLoginData(() => {
                return {
                    username: "",
                    passwort: ""
                }
            })
        }
    }
    function logOut(){
       // props.setUser(loggedInUser)
        props.setLogin(false)
        
        localStorage.setItem("loggedInUser", null)
        console.log( localStorage.getItem("loggedInUser"))
        setLoginData(() => {
            return {
               passwort: "",
               username: ""
            }
        })
        console.log(props.loggedIn)
    }
    //------------------------------------------------
    return ( 
        <>
            <div  className={classes.root} className="fright" >
            {
                JSON.parse(localStorage.getItem("loggedInUser"))  !== null ?
                <Button id="logout-butt" onClick={logOut} variant="contained" color="secondary" size="small"><Link to="/" exact>Abmelden</Link></Button>
                
                :
                <form id="login-form" className={classes.root}>
                    <TextField id="outlined-basic" onChange={eingeben} name="username"  value={loginData.username}  label="username"  variant="outlined" size="small"/>
                    <TextField id="outlined-basic" onChange={eingeben} name="passwort"  value={loginData.passwort} label="passwort" type="password"  variant="outlined" size="small"/>
                    {/* <button type="button">Anmelden</button>  */}
                    <Button onClick={checkLoginData} variant="contained" color="primary" size="small">Anmelden</Button>
                    
                </form>
                
            }
            </div>
            <div className="clearer"></div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (User);