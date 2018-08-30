import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import {connect} from "react-redux";
import './TableCell.css'

export default class TableCell extends Component {

    proptypes = {
        cellContent : PropTypes.object.isRequired
    }

    render(){
        return (
            <div className="cellContainer">
                {this.props.cellContent}
            </div>           
        )
    }
}

