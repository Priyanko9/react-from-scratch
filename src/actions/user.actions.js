import { userConstants } from '../constants';
import { userService } from '../services/user.service';

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

export function login(username, password) {
    // return the promise using fetch which adds to localstorage on resolve
    let userObj={username,password};
    
    return (dispatch)=>{
        dispatch(request(userObj));
        let user=userService.login(username,password);
        if(!user||user.length===0){
            dispatch(failure("error"));
        } else {
            localStorage.setItem("user",JSON.stringify(user[0]));
            dispatch(success(user[0]));
        }
    }
}

function logoutAction() { return { type: userConstants.LOGOUT } }

export function logout() {
    userService.logout();
    return (dispatch)=>{
        dispatch(logoutAction());
    }
    
}


