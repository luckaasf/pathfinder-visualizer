import React from "react";
import '../assets/stylesheets/Node.css';

function Node(props) {
    const {
        row,
        col,
        isStart,
        isFinish,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        isWall,
    } = props;

    const classMap = {
        [isStart]: 'node-start',
        [isFinish]: 'node-finish',
        [isWall]: 'node-wall',
    }

    const extraClassName = classMap[true] || '';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
};

export default Node;
