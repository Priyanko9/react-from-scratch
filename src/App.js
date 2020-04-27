import React from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


import Events from './components/Events';
import BookedEvents from './components/BookedEvents';
import CreatedEvents from './components/CreatedEvents';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import {logout} from './actions/user.actions';
import {PrivateRoute} from './PrivateRoute';
import Navbar from './utilities/Navbar';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/CreateEvent';




function App(props) {
  let {loggedIn,logout}=props;
  
  
  
  return (
    <div className="App">
          Testing123,changed again,final testing ,doubt ???
          <Navbar/>
          <Switch>
            <Route exact path="/events" component={Events}  />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/createdEvents" component={CreatedEvents} />
            <PrivateRoute path="/bookedEvents" component={BookedEvents} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/eventDetail" component={EventDetail} />
            <PrivateRoute path="/createEvent" component={CreateEvent} />
            <Redirect exact from="/" to="/events"/>
          </Switch>
          {!loggedIn &&<div className="login">
            <NavLink to="/login" className="navlinkTab">Login</NavLink>
            </div>}
          {loggedIn &&<div className="logout" onClick={()=>logout()}>Logout</div>}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    loggedIn:state.authentication.loggedIn
  }
}

const mapDispatchToProps=(dispatch)=>{
  return { 
    logout:()=>dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
