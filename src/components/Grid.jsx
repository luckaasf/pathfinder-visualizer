import React, { useState, useEffect, useContext } from "react";
import Node from "./Node";
import '../assets/stylesheets/Grid.css';
import { Dijkstra, getShortestPath } from '../assets/algorithms/Dijkstra';
import { AStar as Astar, getShortestPathAstar } from '../assets/algorithms/AStar';
import MyContext from "./MyContext";

const GRID_ROW_SIZE = 22;
const GRID_COL_SIZE = 67;

const START_NODE_ROW = 11;
const START_NODE_COL = 20;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 40;

function Grid() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const { isAlgorithmRunning } = useContext(MyContext);

    function handleOnMouseDown(row, col) {
        if ((grid[row][col].isStart) || (grid[row][col].isFinish)) return;
        const newGrid = toggleWallGrid(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    function handleOnMouseEnter(row, col) {
        if (!mouseIsPressed || (grid[row][col].isStart) || (grid[row][col].isFinish) || grid[row][col].isWall) return;
        const newGrid = toggleWallGrid(grid, row, col);
        setGrid(newGrid);
    }

    function handleOnMouseUp() {
        setMouseIsPressed(false);
    }

    useEffect(() => {
        if (isAlgorithmRunning) {
            handleVisualizeButton();
        }
      }, [isAlgorithmRunning]);

    useEffect(() => {
        const newGrid = initializeGrid();
        setGrid(newGrid);

        function handleDocumentMouseUp() {
            setMouseIsPressed(false);
        }

        document.addEventListener("mouseup", handleDocumentMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };
    }, []);

    function animatePathFinder(visitedNodes, shortestPathNodes) {
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                if (i === visitedNodes.length - 1) {
                    animateShortestPath(shortestPathNodes);
                }
                const currentNode = visitedNodes[i];
                if (!((currentNode.row === START_NODE_ROW && currentNode.col === START_NODE_COL) || (currentNode.row === FINISH_NODE_ROW && currentNode.col === FINISH_NODE_COL)))
                    document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-visited";
            }, 10 * i);
        }
    }

    function animateShortestPath(shortestPathNodes) {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const currentNode = shortestPathNodes[i];
                if (!((currentNode.row === START_NODE_ROW && currentNode.col === START_NODE_COL) || (currentNode.row === FINISH_NODE_ROW && currentNode.col === FINISH_NODE_COL)))
                    document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-shortest-path";
            }, 35 * i);
        }
    }

    function handleVisualizeButton() {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]; 
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const currentGrid = grid;
        const visitedNodes = Astar(currentGrid, startNode, finishNode);
        //const shortestPathNodes = getShortestPath(finishNode);
        const shortestPathNodesAstar = getShortestPathAstar(finishNode);
        //animatePathFinder(visitedNodes, shortestPathNodes);

        animatePathFinder(visitedNodes, shortestPathNodesAstar);
    }   

    return (
        <>
            {/*<button className="visualize-button" onClick={() => handleVisualizeButton()}>Visualize</button>*/}
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
        </>
    );
}

function initializeGrid() {
    const grid = [];
    for (let row = 0; row < GRID_ROW_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_COL_SIZE; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(row, col) {
    return {
        row,
        col,
        isVisited: false,
        isWall: false,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        heuristic: 0,
        previousNode: null,
    };
}

function toggleWallGrid(grid, row, col) {
    const newGrid = grid.slice();
    const oldNode = newGrid[row][col];
    const newNode = { ...oldNode, isWall: !oldNode.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
}

export default Grid;
