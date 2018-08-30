import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TableCell from './TableCell';
import './TableRow.css'



export default class TableRow extends Component {

    proptypes = {
        rowData : PropTypes.array
    }

    render(){
        return (
            <div className="rowContainer">
                {
                    this.props.rowData.map((item, id) => {
                        return (
                            <TableCell key={id} cellContent={item} />
                        )
                    })
                }
            </div>
        )
    }
}