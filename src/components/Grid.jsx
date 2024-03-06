import React from "react";
import Node from "./Node";
import '../assets/stylesheets/Grid.css';

const GRID_ROW_SIZE = 10;
const GRID_COL_SIZE = 25;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;

class Grid extends React.Component {
    
    constructor() {
        super();
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = initializeGrid();
        this.setState({grid});
    }

    render () {
        const { grid } = this.state;
        console.log(this.state.grid);
        return (
            <div className="grid">
                {grid.map((row, rowIndex) => {
                    return(
                        <div key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                const {row, col, isWall, isStart, isFinish} = node;
                                return(
                                    <Node>
                                        key={nodeIndex}
                                        row={row}
                                        col={col}
                                        isWall={isWall}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                    </Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

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

export default Grid;
