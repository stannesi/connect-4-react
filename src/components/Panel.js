import React, { Component } from 'react';
import './../css/Panel.css';
import './../css/Stone.css';

class Panel extends Component {

    render() {

        const playerColor = (this.props.nextPlayer % 2 === 0 ) ? "red" : "yellow";

        return (
            <div className="panel">
                {/* <button> */}
                <div className="buttons">
                    <a href="#" className="undo" onClick={this.props.undoClick}></a>
                    <a href="#" className="new" onClick={this.props.resetClick}></a>
                </div>
                
                <div className="turn-panel" >
                    <div className={"stone " + playerColor}></div>
                </div>
            </div>
        );
    }
}

export default Panel;
