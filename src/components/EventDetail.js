import React from 'react';
import {connect} from 'react-redux';
import {saveBooking} from '../actions/event.action';
import {withRouter} from 'react-router-dom';

const EventDetails=(props)=>{
    const {saveBooking,events,history}=props;
    
    let eventId=window.location.search.split("?")[1];
    let eventToBook;
    events.forEach(ele=>{
        if(ele.id===eventId){
            eventToBook=ele;
        }
    })
    const bookEvent=()=>{
        saveBooking(eventToBook);
        history.push('/bookedEvents');
    }
    return (
        eventToBook ? (<div className="eventDetail">
            <div>
                <label>Name:</label>
                <span>{eventToBook.event}</span>
            </div>
            <div>
                <label>Place:</label>
                <span>{eventToBook.place}</span>
            </div>
            <div>
                <label>Description:</label>
                <span>{eventToBook.description}</span>
            </div>
            <div>
                <button onClick={()=>bookEvent()}>BookEvent</button>
            </div>
        </div>):<div>No details</div>

    )
}

const mapStateToProps=(state)=>{
    return {
        events:state.manageEvents.eventsArray
    };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveBooking:(eventToBook)=>dispatch(saveBooking(eventToBook))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EventDetails))

