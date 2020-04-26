import React,{useState,useEffect,useCallback,useRef} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


import {Grid} from '../utilities/Grid';
import { useModal } from '../utilities/modal';
import { ToolTipfunc } from '../utilities/tooltip';
import { bookings } from '../data/bookings';
import { events } from '../data/events.js';
import {users} from '../data/users';

const CreatedEvents=(props)=>{
    let [eventsData,setEventsData]=useState(events)
    let [visitors,setVisitors]=useState([])
    const [isOpen,setIsOpen]=useState(false);
    const [Modal,closeModal]=useModal();
    let [isHover,setIsHover]=useState(false);
    const tooltipRef=useRef();
    const [ToolTip,closeTooltip]=ToolTipfunc();
    const clickHandler=(eventobj,row,column,index)=>{
      let visitors=[];
      let bookingsForEvent;
      if(bookings && bookings.length > 0){
        bookingsForEvent=bookings.filter(booking=>{
          if(row.id===booking.event){
            return true;
          }
          return false;
        })
      }
      if(bookingsForEvent && bookingsForEvent.length > 0){
        bookingsForEvent.forEach((ele,index)=>{
          users.forEach((user)=>{
            if(user.userid===ele.user){
              visitors.push({
                  name:user.name,
                  userid:user.userid
              })
            }
          })
        });
      }
      setVisitors(visitors)
      setIsOpen(true);
    }
    
    const closeOpenedModal=useCallback(()=>{
        setIsOpen(false);
        setIsHover((isHover)=>{
          return false
        });
        closeModal();
        closeTooltip();
    })
    
    const toogleToolTip=(e)=>{
      if(isHover){
        closeTooltip();
      } 
      tooltipRef.current=e;
      if(!isOpen){
        setIsHover((isHover)=>{
          return !isHover
        });
      }
    }
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
    },{
      name:"Vistors",
      type:"string",
      clickHandler,
      default:"See List",
      style:"visitorModal",
      tooltip:{
        mouseEnter:toogleToolTip,
        mouseLeave:toogleToolTip
      }
    }];

  let visitorsGridColumns=[{
      name:"userid",
      type:"string",
      search:true
    },{
      name:"name",
      type:"string",
      search:true
    }];

  let gridOptions={
    checkbox:true,
    rowClick:true
  }
  let vistorGridOptions={};
    
  useEffect(()=>{
    let createdEvents=events.filter((ele)=>{
      if(ele.createdBy===props.user){
        return true;
      }
      return false;
    })
    setEventsData(createdEvents);
  },[events])

  return (
      <div className="component tooltipElement">
        {isOpen && <Modal title="Vistors" isCloseButton={true} ok={()=> {setIsOpen(false);alert("ok")}} close={closeOpenedModal}>
        {(!visitors || visitors.length===0) ?<div>No one has booked yet</div>:<Grid data={visitors} gridColumns={visitorsGridColumns} gridOptions={vistorGridOptions} />}
          </Modal>
        }
        <Grid data={eventsData} gridColumns={gridColumns} gridOptions={gridOptions}/>
        {isHover && <ToolTip  reference={tooltipRef} tooltipPosition="left"  message="click to see the list of people attending the event"/>}
      </div>
  )
}

const mapStateToProps=(state)=>{
  return {
    loggedIn:state.authentication.loggedIn,
    user:state.authentication.user.userid
  }
}


export default withRouter(connect(mapStateToProps)(CreatedEvents));
