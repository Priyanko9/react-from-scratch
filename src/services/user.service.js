import {users} from '../data/users';

export const userService = {
    login,
    logout
};

function login(username, password) {
    let foundUser=users.filter(ele=>{
        if(ele.email===username && ele.password===password){
            return true;
        }
        return false;
    })
    return foundUser;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}



