import * as api from './apiConstants'


const loginEndpoint = "/login"
const signupEndpoint = "/signup"

export function performLoginRequest(username, password) {
    let uri = loginEndpoint + '?username='+username+'&password='+password;
    return api.createPostRequest(uri);
}   
