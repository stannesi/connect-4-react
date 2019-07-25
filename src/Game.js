import React, { Component } from 'react';
import './css/Game.css';
import logo from './imgs/logo.png';

import Board from './components/Board';
import Panel from './components/Panel';

// boards[] --> 0 for empty cell, 1 (red), 2 (yellow)
// winner --> 0 no one/game still going, 1 (red), 2 (yellow), 3 (tie)
// redIsNext --> true if (red) turn, false if (yellow) turn
// currentPlayer --> 0 reset , 1 (red), 2 (yellow)

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board:[
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]],
            stack: [0, 0, 0, 0, 0, 0, 0],
            moves: [],
            currentPlayer: 0,
            stones: [],
            marks: [],
            winner: 0,
            won: false
        }
    };

    canPlay = (col) => {
        const { won, stack } = this.state;
    
        return !won && stack[col] < 6;
    }

    play = (col) => {
        
        let row;

        this.setState((prevState) => {
            
            let { board, stack, currentPlayer, moves, stones } = prevState;

            // const board = board.map(arr => arr.slice());

            // get row --- > 5 - stack[col] for reverse look on array grid
            row = 5 - stack[col];

            // get current player { 1: red, 2: yellow }
            currentPlayer = 1 + moves.length % 2;
    
            // update board
            board[row][col] = currentPlayer;

            // clone, add and update to col stack count
            // const stack = stack.slice();
            stack[col]++;

            stones.push({ color: currentPlayer, col: col, stack: stack[col] - 1 });

            // clone and push player moves to col
            // const moves = moves.slice();
            moves.push(col);
            
            // check for winner
            this.checkForWin();
            
            return {
                board,
                stack,
                currentPlayer,
                moves,
                stones
            };
        });

    }

    markWin(x, y, dx, dy) {
        const { marks } = this.state

        for (var i = 0; i < 4; i++) {
            marks.push({ row: x + i * dx,  col: y + i * dy })

            this.setState ( { marks } );
        }
    }

    checkHorizontalWin(board) {
        // check only if column is 3 or less
        for (let r = 0; r < 6; r++ ) {
            for (let c = 0; c < 4; c++ ) {
                if (board[r][c] > 0) {
                    const val = board[r][c];
                    if (board[r][c + 1] === val &&
                        board[r][c + 2] === val &&
                        board[r][c + 3] === val ) {
                            
                            // mark winning stones
                            this.markWin(r, c, 0, 1);
                            return true;
                        }
                }
            }
        }

        return false;
    }

    checkVerticalWin(board) {
        // check from row 3+  or greater
        for (let r = 3; r < 6; r++ ) {
            for (let c = 0; c < 7; c++ ) {
                if (board[r][c] > 0) {
                    const val = board[r][c];
                    if (board[r - 1][c] === val &&
                        board[r - 2][c] === val &&
                        board[r - 3][c] === val ) {

                            // mark winning stones
                            this.markWin(r, c, -1, 0);
                            return true;
                        }
                }
            }
        }

        return false;
    }

    checkDiagonalRight(board) {
        // check from row 3+  or greater and column 3 or less
        for (let r = 3; r < 6; r++ ) {
            for (let c = 0; c < 4; c++ ) {
                if (board[r][c] > 0) {
                    const val = board[r][c];
                    if (board[r - 1][c + 1] === val &&
                        board[r - 2][c + 2] === val &&
                        board[r - 3][c + 3] === val ) {
                            
                            // mark winning stones
                            this.markWin(r, c, -1, 1);
                            return true;
                        }
                }
            }
        }

        return false;
    }

    checkDiagonalLeft(board) {
        // check from row 3+  or greater ans column 3 or less
        for (let r = 3; r < 6; r++ ) {
            for (let c = 3; c < 7; c++ ) {
                if (board[r][c] > 0) {
                    const val = board[r][c];
                    if (board[r - 1][c - 1] === val &&
                        board[r - 2][c - 2] === val &&
                        board[r - 3][c - 3] === val ) {
                            
                            // mark winning stones
                            this.markWin(r, c, -1, -1);
                            return true;
                        }
                }
            }
        }

        return false;
    }

    checkForWin = () => {
        const { board, moves } = this.state;

        if (this.checkHorizontalWin(board) ||
            this.checkVerticalWin(board) ||
            this.checkDiagonalRight(board) ||
            this.checkDiagonalLeft(board)
        
        ) {

            // 1 - red, 2 - yellow
            const winner = moves.length % 2 === 0 ? 2  : 1;

            this.setState ({
                won: true,
                winner
            });
        }
   
    }

    cellClickHandler = (col) => {
        if (this.canPlay(col)) {
            this.play(col);
        }
    }

    getEmptyBoard = () => {
        let board = [];
        for(let i = 0; i < 6; i++ ){
            board.push(new Array(7).fill(0));
        }
        return board
    }

    reset = () => {
        let board = this.getEmptyBoard();

        if(this.state.moves.length > 0)
         {
            this.setState({
                board,
                stack: new Array(7).fill(0),
                moves: [],
                currentPlayer: 0,
                stones: [],
                marks: [],
                winner: 0,
                won: false
            });
        }
    }

    undo = () => {
        if (this.state.moves.length >  1)
        {
            this.setState((prevState) => {
            
                let { board, stack, currentPlayer, moves, stones, marks,  won, winner } = prevState;

                // pop recent moves and get col
                const col = moves.pop();

                // decement stack
                stack[col]--;

                // get row frm stack
                const row = 5 - stack[col];

                // pop recent stone from array
                stones.pop();

                // update board info
                board[row][col] = 0;

                // set current player
                currentPlayer = 1 + moves.length % 2;

                // if user won undo winning
                if (won) {
                    won = false;
                    marks = [];
                    winner = 0;
                }
 
                return {
                    board,
                    stack,
                    currentPlayer,
                    moves,
                    stones,
                    marks,
                    won,
                    winner
                };
            });
        }
    }

    render() {
        const nextPlayer = this.state.moves.length % 2;

        return (
            <div className="game">
                <header className="game-header">
                    <img src={logo} className="game-logo" alt="logo" />
                    <div> Connect 4 React </div>
                </header>
                <Panel nextPlayer={nextPlayer} undoClick={this.undo} resetClick={this.reset} />
                <Board board={this.state.board}
                    stones={this.state.stones}
                    marks={this.state.marks}
                    cellClick={this.cellClickHandler}
                />

            </div>
        );
    }
}

export default Game;
