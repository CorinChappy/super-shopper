import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, MenuItem } from '../../../node_modules/@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import BooleanDialog from './../Utilities/BooleanDialog';



export default class GroupCard extends Component {

    constructor(props){
        super(props)
        this.cancel = this.cancel.bind(this)
    
        this.state = {
            anchorEl: null,
            openDialog: false,
            dialogInfo:null
        }
}

    PropTypes = {
        groupName: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        members: PropTypes.array.isRequired,
        addUser: PropTypes.func.isRequired,
        deleteGroup: PropTypes.func.isRequired,
        explore: PropTypes.func
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    menuItemClicked = (buttonAction, groupName) => {
        switch(buttonAction) {
            case "add":
                break;
            case "delete":
                this.renderDeleteDialog(groupName);
                break;
            default:
                break;
        }
    } 

    deleteGroup= () => {

    }

    cancel = () => {
        this.setState({openDialog: false})
    }

    renderDeleteDialog = (groupName) => {
        this.setState({
            openDialog : true,
            anchorEl: null,
            dialogInfo : {
                positiveAction: this.deleteGroup,
                positiveActionText: "Delete",
                negativeAction: this.cancel,
                negativeActionText: "cancel",
                dialogContentText: "Are you sure you want to delete group " + groupName,
                dialogTitle: "Delete Grouop"
            }
        })
  
    }

    render(){
        return (
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="groupAvatar">
                                {this.props.groupName[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton 
                                aria-owns={this.state.anchorEl ? this.props.id : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.groupName}
                        subheader={"Created: " + this.props.createdDate}
                    />
                    <CardContent>
                        <Typography component="h3">
                            GroupMembers:
                        </Typography>
                        {
                            this.props.members.map((member,id) => {
                                return (
                                <Typography key={id} component="p">
                                    {"- " + member}
                                </Typography>)
                            })   
                        }

                    </CardContent>

                </Card>
                <Menu
                    id={this.props.id}
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={ ()=> {this.menuItemClicked("add")}}>Add New Members</MenuItem>
                    <MenuItem onClick={ ()=> {this.menuItemClicked("delete", this.props.groupName)}}>Delete Group</MenuItem>
                </Menu>
                {
                    this.state.openDialog ?
                    <BooleanDialog
                        open={this.state.openDialog}
                        positiveAction={this.state.dialogInfo.positiveAction}
                        negativeAction={this.state.dialogInfo.negativeAction}
                        positiveActionText={this.state.dialogInfo.positiveActionText}
                        negativeActionText={this.state.dialogInfo.negativeActionText}
                        dialogTitle={this.state.dialogInfo.dialogTitle}
                        dialogContentText={this.state.dialogInfo.dialogContentText}
                    /> : null
                }

            </div>
        )
    }
}