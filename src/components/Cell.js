import React, { Component } from 'react';
import './../css/Cell.css';

class Cell extends Component {

    render() {
        const styles = {
            top: (5 - this.props.row) * 100/7 + '%',
            left: this.props.col * 100/7 + '%'
        };

        return (
            <div
                id={"cell-" + this.props.row + "-" + this.props.col}
                className="cell"
                style={styles}
                onClick={() => {this.props.cellClick(this.props.col)}}
            >
            </div>
        );
    }
}

export default Cell;
