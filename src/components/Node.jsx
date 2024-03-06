import React from "react";
import '../assets/stylesheets/Node.css'

class Node extends React.Component{
    render() {
        const {
            row,
            col,
            //isVisited,
            isStart,
            isFinish,
            //onMouseDown,
            //onMouseEnter,
            //onMouseUp,
            isWall,
        } = this.props;

        const classMap = {
            [isStart]: 'node-start',
            [isFinish]: 'node-finish',
            [isWall]: 'node-wall',
        }

        const extraClassName = classMap[true] || '';

        // render the "default" node to show in the DOM
        return(
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
            ></div>
        );
    }
}

export default Node;