import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TableRow from './TableRow';
import './TableGrid.css'




export default class TableGrid extends Component {

    proptypes = {
        tableData : PropTypes.array.isRequired
    }

    organiseRowData(){
        let maxPerRow = 3;
        let offset = 0;
        let maxLength = this.props.tableData.length;
        let rowsArray = [];

        while(offset < maxLength){
            if((offset + maxPerRow) < maxLength){
                rowsArray.push(this.props.tableData.slice(offset, offset+maxPerRow))
            } else {
                rowsArray.push(this.props.tableData.slice(offset, maxLength))
            }
            offset = offset+ maxPerRow;
        }
        return rowsArray;
    }


    render() {
           return (
           <div className="gridContainer">
                {
                    this.organiseRowData().map((row, id) => {
                        return <TableRow key={id} rowData={row}/>
                    })
                }
            </div>
           )
    }
}