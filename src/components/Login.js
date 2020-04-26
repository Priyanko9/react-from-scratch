import React,{useState,useRef,useCallback} from 'react';
import {login} from '../actions/user.actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


const Login=(props)=>{
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let emailRef=useRef();
    let pwdRef=useRef();
    let {login}=props;
    const loginAction=useCallback(()=>{
        login(emailRef.current.value,pwdRef.current.value);
        props.history.push('/');
    })
    return(
        <div className="loginComponent">
            <div className="email">
                <input type="text" ref={emailRef} name="email" placeholder="email"/>
            </div>
            <div className="password">
                <input type="password" ref={pwdRef} name="password" placeholder="password"/>
            </div>
            <div className="buttonContainer">
                <input type="button" onClick={loginAction} value="Login"/>
            </div>
        </div>
    )
}


const mapDispatchToProps=(dispatch)=>{
    return { 
        login:(email,password)=>dispatch(login(email,password))
    }
}
  
export default withRouter(connect(null,mapDispatchToProps)(Login));

