import React,{useState,useEffect} from 'react';


import {Grid} from '../utilities/Grid.js';
import { events } from '../data/events.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const BookedEvents=(props)=>{
    let [bookedEvents,setBookedEvents]=useState(events)
    
    let gridColumns=[{
        name:"selection",
        type:"checkbox",
      },{
        name:"id",
        type:"string",
        search:true
      },{
        name:"event",
        type:"string",
        search:true
      },{
        name:"place",
        type:"string",
        search:true
      }];
    
    let gridOptions={
      checkbox:true,
      rowClick:true
    }

    useEffect(()=>{
      let bookedEvents=[];
      props.bookings.forEach(bookedevent=>{
        if(bookedevent.user===props.user){
         events.forEach(ele=>{
            if(ele.id===bookedevent.event){
              bookedEvents.push(ele) ;
            }
          })
        }
      })
      setBookedEvents(bookedEvents);
    },[])

    return (
        <div className="component">
          <Grid data={bookedEvents} gridColumns={gridColumns} gridOptions={gridOptions}/>
        </div>
    )
}

const mapStateToProps=(state)=>{
  return {
    loggedIn:state.authentication.loggedIn,
    user:state.authentication.user.userid,
    bookings:state.manageEvents.bookingsArray
  }
}


export default withRouter(connect(mapStateToProps)(BookedEvents));