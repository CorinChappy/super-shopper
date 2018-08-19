export const BASE_URL = "http://localhost:8080/api/v1";

export const rp = require('request-promise');

export const httpPostOptions = {
    method: 'POST',
    uri: BASE_URL,
    json: true // Automatically stringifies the body to JSON
};