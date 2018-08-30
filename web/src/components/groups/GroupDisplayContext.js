import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GroupCard from './GroupCard';
import TableGrid from '../Table/TableGrid';
import {deleteGroup, exploreGroup, addUser, working} from '../../actions/GroupActions';


const mapStateToProps = state => {
    return {
        groups: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    deleteGroup: (id, groupId) => {
        dispatch(deleteGroup(groupId))
    },
    exploreGroup: (groupId) => {
        dispatch(exploreGroup(groupId))
    },
    addUserToGroup: (userDetails) => {
        dispatch(addUser(userDetails))
    },
    working: () => {
        dispatch(working())
    }
})


class GroupDisplayContext extends Component {

    PropTypes = {
        groups: PropTypes.object
    }

    deleteGroup = (id, groupId) => {
        this.props.working();
        this.props.deleteGroup(id, groupId);
    }

    explore =(groupId)=> {
        this.props.working();
        this.props.explore(groupId)
    }
    
    generateGroupDisplayItems(){
       let items = [
           {groupName: "A-group1", createdDate: "10,10,2000", members: ["a", "bac","ddd"]}, 
        {groupName: "B-group2", createdDate: "11,10,2000", members: ["cacc", "cbac","cddd"]},
        {groupName: "C group3", createdDate: "12,10,2000", members: ["va", "vbacv","vddd"]},
        {groupName: "group4", createdDate: "13,10,2000", members: ["a", "bac","ddd"]}, 
        {groupName: "A group5", createdDate: "14,10,2000", members: ["cacc", "cbac","cddd"]},
        {groupName: "group6", createdDate: "15,10,2000", members: ["va", "vbacv","vddd"]},
        {groupName: "group7", createdDate: "15,10,2000", members: ["va", "vbacv","vddd"]}
    ]
        
        return items.map(( group, id)=> {
             return (<GroupCard  key={id}
                        groupName={group.groupName}
                        createdDate={group.createdDate}
                        members={group.members} 
                        addUser={(userDetails)=>{this.addUser(userDetails)}}
                        deleteGroup={()=>{this.deleteGroup(id, group.id)}}
                        explore={()=>{this.explore(group.id)}}
                        /> )
            })
    }

    render() {
        let items = this.generateGroupDisplayItems()
        return (
            <div>
                <TableGrid tableData={items} />
            </div>
        )
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(GroupDisplayContext);