import React, { Component } from 'react';
import './../css/Row.css';

import Cell from './Cell';

class Row extends Component {

    render() {
        let cells = []; 

        for(let i =0; i < 7; i++) {
            cells.push(<Cell 
                key={i}
                value={this.props.cells[i]}
                row={this.props.row}
                col={i}
                cellClick={this.props.cellClick}
            />);
        }

        return (
            <div id={"row-" + this.props.row} className="row">
                { cells }
            </div>
        );
    }
}

export default Row;
