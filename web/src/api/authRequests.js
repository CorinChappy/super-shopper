import * as api from './apiConstants'


export function createPostRequest(uri) {
    let request = Object.assign(api.httpPostOptions, {
        uri : api.BASE_URL + uri
    });
    return api.rp(request);
}   
