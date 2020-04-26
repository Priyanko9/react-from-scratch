import React,{useState,useEffect,useRef} from 'react';

import {connect} from 'react-redux';
 import { withRouter } from 'react-router-dom';

import {Grid} from '../utilities/Grid.js';
import {ToolTipfunc} from '../utilities/tooltip';

const Events=(props)=>{
    let {totalEvents}=props;
    let [eventsData,setEventsData]=useState([]);
    let [isHover,setIsHover]=useState(false);
    const tooltipRef=useRef();
    const [ToolTip,closeTooltip]=ToolTipfunc();
    useEffect(()=>{
      setEventsData(totalEvents);
    },[])

    const goToDifferentView=(event,row,column,index)=>{
      setIsHover((isHover)=>{
        return false
      });
      closeTooltip();
      props.history.push('/eventDetail?'+row.id);
    }
    
    const toogleToolTip=(e)=>{
      if(isHover){
        closeTooltip();
      } 
      tooltipRef.current=e;
      setIsHover((isHover)=>{
        return !isHover
      });
    }
    let gridColumns=[{
      name:"id",
      type:"string",
      search:true,
      width:"70px"
    },{
        name:"event",
        type:"string",
        search:true,
        width:"70px",
        clickHandler:goToDifferentView,
        style:"link",
        tooltip:{
          mouseEnter:toogleToolTip,
          mouseLeave:toogleToolTip
        }
      },{
        name:"place",
        type:"string",
        width:"70px",
        search:true
      },{
        name:"createdBy",
        type:"string",
        width:"70px",
        search:true
      }];
    
    let gridOptions={
      rowClick:true
    }
    

    return (
        <div className="component">
          <Grid data={eventsData} gridColumns={gridColumns} gridOptions={gridOptions}/>
          {isHover && <ToolTip  reference={tooltipRef} tooltipPosition="left"  message="click to book an event"/>}
        </div>
    )

}

const mapStateToProps=(state)=>{
  return {
    totalEvents:state.manageEvents.eventsArray
  }
}


export default withRouter(connect(mapStateToProps)(Events));