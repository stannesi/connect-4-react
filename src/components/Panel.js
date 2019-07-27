import React, { Component } from 'react';
import './../css/Panel.css'; 

class Panel extends Component {

    render() {

        const playerColor = (this.props.nextPlayer % 2 === 0 ) ? "red" : "yellow";
        
        return (
            <div className="panel">
                <div className="buttons">
                    <a href="#" className="undo" onClick={this.props.undoClick}></a>
                    <a href="#" className="new" onClick={this.props.resetClick}></a>
                    <div className={"turn-button " + playerColor}></div>
                </div>
            </div>
        );
    }
}

export default Panel;
