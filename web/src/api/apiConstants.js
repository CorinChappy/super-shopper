export const BASE_URL = "http://localhost:8080/api/v1";

export const rp = require('request-promise');

export const httpPostOptions = {
    uri: BASE_URL,
    json: true // Automatically stringifies the body to JSON
};

export const httpGetOptions = {
    method: 'POST',
    uri: BASE_URL,
    json: true // Automatically stringifies the body to JSON
};

export function createPostRequest(uri, method='POST') {
    let request = Object.assign(httpPostOptions, {
        method: method,
        uri : BASE_URL + uri
    });
    return rp(request);
} 

export function createGetRequest(uri, method='GET') {
    let request = Object.assign(httpPostOptions, {
        method: method,
        uri : BASE_URL + uri
    });
    return rp(request);
} 
