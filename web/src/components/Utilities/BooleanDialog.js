import React, { Component } from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default class BooleanDialog extends Component {



    proptypes = {
        open: PropTypes.bool,
        positiveAction : PropTypes.func,
        negativeAction : PropTypes.func,

        positiveActionText : PropTypes.string,
        negativeActionText : PropTypes.string,

        dialogTitle : PropTypes.string,
        dialogContentText : PropTypes.string
    }

    handlePositive = () => {
        // this.props.positiveAction();
        this.close()
    }

    handleNegative = () => {
        this.props.negativeAction()
        this.close()
    }

    close(){
        this.setState({ open : false})
    }


    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ this.props.dialogTitle }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { this.props.dialogContentText }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ this.handlePositive } color="primary">{ this.props.positiveActionText }</Button>
                    <Button onClick={ this.handleNegative } color="primary">{ this.props.negativeActionText }</Button>
                </DialogActions>
            </Dialog>
        )
    }
}