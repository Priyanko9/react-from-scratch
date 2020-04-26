import { eventConstants } from '../constants/event.constants';

export function saveEvent(event) {
    return {
        type: eventConstants.SAVE_EVENT, event
    }
}

export function saveBooking(booking) { 
    return { 
        type: eventConstants.SAVE_BOOKING,booking
    }
 }




