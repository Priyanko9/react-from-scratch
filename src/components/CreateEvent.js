import React from 'react';
import { connect } from "react-redux";
import {saveEvent} from '../actions/event.action';

const CreateEvent=(props)=>{
    

    const submit=(e)=>{
        let newEvent={};
        let form=document.getElementsByTagName("form")[0];
        [...form.elements].forEach(ele=>{
            if(ele.tagName!=="BUTTON"){
                newEvent[ele.name]=ele.value;
            }
        })
        props.saveEvent(newEvent);
        props.history.push("/");
        console.log("submitted");
    }
    return (
        <div className="createEvent">
            <form>
                <input type="text" name="event" placeholder="Event Name"/>
                <input type="text" name="place" placeholder="Place"/>
                <input type="text" name="date" placeholder="Date"/>
                <textarea name="description" placeholder="Description about the event"/>
                <button onClick={(e)=>submit(e)}>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        events:state.manageEvents.eventsArray
    };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveEvent:(newevent)=>dispatch(saveEvent(newevent))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateEvent)


