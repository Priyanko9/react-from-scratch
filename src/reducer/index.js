import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import {manageEvents} from './event.reducer';

const rootReducer = combineReducers({
  manageEvents,
  authentication
});

export default rootReducer;
