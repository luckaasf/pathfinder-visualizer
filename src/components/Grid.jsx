import React, { useState, useEffect } from "react";
import Node from "./Node";
import '../assets/stylesheets/Grid.css';

const GRID_ROW_SIZE = 15;
const GRID_COL_SIZE = 35;

const START_NODE_ROW = 7;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 7;
const FINISH_NODE_COL = 25;

function Grid() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const handleOnMouseDown = (row, col) => {
        const newGrid = toggleWallGrid(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleOnMouseEnter = (row, col) => {
        if (!mouseIsPressed || (row === START_NODE_ROW && col === START_NODE_COL) || (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)) return;
        const newGrid = toggleWallGrid(grid, row, col);
        setGrid(newGrid);
    };

    const handleOnMouseUp = () => {
        setMouseIsPressed(false);
        console.log("MOUSE UP");
    };

    useEffect(() => {
        const newGrid = initializeGrid();
        setGrid(newGrid);
    }, []);

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div className="key-container" key={rowIndex}>
                    {row.map((node, nodeIndex) => {
                        const { row, col, isWall, isStart, isFinish, isVisited } = node;
                        return (
                            <Node
                                key={nodeIndex}
                                row={row}
                                col={col}
                                isVisited={isVisited}
                                isWall={isWall}
                                isStart={isStart}
                                isFinish={isFinish}
                                mouseIsPressed={mouseIsPressed}
                                onMouseDown={() => handleOnMouseDown(row, col)}
                                onMouseEnter={() => handleOnMouseEnter(row, col)}
                                onMouseUp={handleOnMouseUp}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_ROW_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_COL_SIZE; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (row, col) => {
    return {
        row,
        col,
        isVisited: false,
        isWall: false,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    };
};

const toggleWallGrid = (grid, row, col) => {
    const newGrid = grid.slice();
    const oldNode = newGrid[row][col];
    const newNode = { ...oldNode, isWall: !oldNode.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
};

export default Grid;
