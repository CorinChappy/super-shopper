import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroupCard from './GroupCard';
import { connect } from 'net';



const mapStateToProps = state => {
    return {
        groups: state.user.groups
    }
}

const mapDispatchToProps = dispatch = ({
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

class GroupSummary extends Component {

    PropTypes = {
        groups: PropTypes.array.isRequired
    }

    deleteGroup = (id, groupId) => {
        this.props.working();
        this.props.deleteGroup(id, groupId);
    }

    explore =(groupId)=> {
        this.props.working();
        this.props.explore(groupId)
    }


    render(){
        return (
            <div>
                {
                    groups.forEach((id, group)=> {
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
            </div>
        )
    }
}

export default connect(
    null,
    mapStateToProps,
    mapDispatchToProps
)(GroupSummary);