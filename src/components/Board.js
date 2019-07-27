import React, { Component } from 'react';
import './../css/Board.css';

import Row from './Row';
import Stone from './Stone'
import Mark from './Mark'


class Board extends Component {

    render() {

        let rows = [];

        for(let i =0; i < 6; i++) {
            rows.push(<Row
                key={i}
                row={i}
                cells={this.props.board[i]}
                cellClick={this.props.cellClick}
            />);
        }

        let stones = [];

        for(let i =0; i < this.props.stones.length; i++) {
            
            const playerColor = (i % 2 === 0 ) ? "red" : "yellow";

            stones.push(<Stone
                key={i}
                id={i}
                col={this.props.stones[i].col}
                row={this.props.stones[i].stack}
                color={playerColor}
            />);
        }

        let marks = [];

        for(let i =0; i < this.props.marks.length; i++) {
            
            const playerColor = (i % 2 === 0 ) ? "red" : "yellow";

            stones.push(<Mark
                key={i}
                id={i}
                col={this.props.marks[i].col}
                row={this.props.marks[i].row}
                color={playerColor}
            />);
        }

        return (
            
            <div className="board">
                { rows }
                { stones }
                { marks }
            </div>
        );
    }
}

export default Board;
