import * as api from './apiConstants'

const BASEURL = "/group/"
const getGroupUsersEndpoint = "/users"
const createGroupEndpoint = "/group/create"

export const getGroups = (userId, token) => {
    uri = get
}


export const performGetGroupRequest = (groupId) => {
    uri = BASEURL + groupId;
    return api.createGetRequest(groupId)
}


export const performGetGroupUsersRequest = (groupId) => {
    uri = BASEURL + groupId + getGroupUsersEndpoint;
    return api.createGetRequest(groupId)
}


export const performCreateUsersRequest = (groupId, token) => {
    uri = BASEURL + createGroupEndpoint;
    return api.createPostRequest(groupId)
}