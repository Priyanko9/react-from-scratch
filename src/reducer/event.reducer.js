import { eventConstants } from '../constants';
import { events } from '../data/events';
import { bookings } from '../data/bookings';

let bookingsArray = JSON.parse(localStorage.getItem('bookings'))||bookings;
let eventsArray=JSON.parse(localStorage.getItem('events'))||events;

const initialState =  { bookingsArray, eventsArray };

export function manageEvents(state = initialState, action) {
  switch (action.type) {
    case eventConstants.SAVE_EVENT:
        let newEvent={
          id:Math.floor(Math.random()*10).toString(),
          ...action.event,
          createdBy:JSON.parse(localStorage.getItem("user")).userid
        }
        let totalEvents=[newEvent].concat(eventsArray);
        localStorage.setItem("events",JSON.stringify(totalEvents));
      return {
        ...state,
        eventsArray:totalEvents 
      };
    case eventConstants.SAVE_BOOKING:
      
      let newBooking={
        id:Math.floor(Math.random()*10).toString(),
        user:JSON.parse(localStorage.getItem("user")).userid,
        event:action.booking.id,
        date:action.booking.date
      }
      let totalBookings=[newBooking].concat(bookingsArray);
      localStorage.setItem("bookings",JSON.stringify(totalBookings))
      return { 
          ...state,
        bookingsArray:totalBookings 
        };
    default:
      return state
  }
}