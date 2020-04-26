import React,{Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

export const Navbar=(props)=>{
    return (
        <div className="tabHolder">
             <NavLink to="/events" className="navlinkTab">Events</NavLink>
            {props.loggedIn && <NavLink to="/createdEvents" className="navlinkTab">Created Events</NavLink>}
            {props.loggedIn &&<NavLink to="/bookedEvents" className="navlinkTab">Booked Events</NavLink>}
            {props.loggedIn &&<NavLink to="/dashboard" className="navlinkTab">Dashboard</NavLink>}
            {props.loggedIn &&<NavLink to="/createEvent" className="navlinkTab">Create Event</NavLink>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      loggedIn:state.authentication.loggedIn
    }
  }
  
export default connect(mapStateToProps)(Navbar);