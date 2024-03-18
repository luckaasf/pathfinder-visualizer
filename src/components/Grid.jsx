import React, { useState, useEffect, useContext } from "react";
import Node from "./Node";
import '../assets/stylesheets/Grid.css';
import { Dijkstra as dijkstra, getShortestPath as dijkstraPath } from '../assets/algorithms/Dijkstra';
import { AStar as astar, getShortestPathAstar as astarPath } from '../assets/algorithms/AStar';
import MyContext from "./MyContext";
import RandomMaze from "../assets/mazes/RandomMaze";
import BinaryTree from "../assets/mazes/BinaryTree";

const GRID_ROW_SIZE = 23;
const GRID_COL_SIZE = 67;

const START_NODE_POSITION = { row: 1, col: 1 };
const FINISH_NODE_POSITION = { row: 21, col: 65};

function Grid() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [nodePressed, setNodePressed] = useState(null);
    const [startNodePosition, setStartNodePosition] = useState(START_NODE_POSITION);
    const [finishNodePosition, setFinishNodePosition] = useState(FINISH_NODE_POSITION);

    const { config } = useContext(MyContext);

    function handleOnMouseDown(row, col) {
        const node = grid[row][col];
        if (node.isStart || node.isFinish) {
            setNodePressed(node);
            setMouseIsPressed(true);
        } else {
            const newGrid = toggleWallGrid(grid, row, col);
            setGrid(newGrid);
            setMouseIsPressed(true);
        }
    }

    function handleOnMouseEnter(row, col) {
        if (!mouseIsPressed || (grid[row][col].isStart) || (grid[row][col].isFinish) || grid[row][col].isWall) return;
        if (nodePressed) {
            const newGrid = moveNode(grid, row, col, nodePressed.row, nodePressed.col);
            setGrid(newGrid);
            setNodePressed({ ...nodePressed, row: row, col: col });
            
            if (nodePressed.isStart) {
                setStartNodePosition( {row: row, col: col} );
            } else if (nodePressed.isFinish) {
                setFinishNodePosition( {row: row, col: col} );
            }
            
        } else {
            const newGrid = toggleWallGrid(grid, row, col);
            setGrid(newGrid);
        }
    }

    function handleOnMouseUp() {
        setMouseIsPressed(false);
        setNodePressed(null);
    }

    function moveNode(grid, newRow, newCol, oldRow, oldCol) { 
        const newGrid = grid.map(row => row.slice());
        const oldNode = newGrid[oldRow][oldCol];
        const newNode = { ...oldNode, row: newRow, col: newCol };
        newGrid[oldRow][oldCol] = { ...grid[oldRow][oldCol], isStart: false, isFinish: false };
        newGrid[newRow][newCol] = newNode;
        return newGrid;
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
            isStart: row === startNodePosition.row && col === startNodePosition.col,
            isFinish: row === finishNodePosition.row && col === finishNodePosition.col,
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

    useEffect(() => {
        switch (config.maze) {
            case 'random':
                const randomWalls = RandomMaze(grid);
                animateMaze(randomWalls);
                break;
            case 'binarytree':
                const binaryTreeWalls = BinaryTree(grid);
                animateMaze(binaryTreeWalls);
                break;
            default:
                break;
        }
    }, [config.maze]);

    useEffect(() => {
        if (config.isAlgorithmRunning) {
            if (config.algorithm !== "") {
                console.log(config);
                handleVisualizeButton();
            } else {
                console.log("ERROR");
            }
        }
    }, [config.isAlgorithmRunning]);

    useEffect(() => {
        console.log(config);
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
    
    function animateMaze(walls) {
        for (let i = 0; i < walls.length; i++) {
            setTimeout(() => {
                const currentNode = walls[i];
                document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-wall";
            }, (parseInt(config.speed)) * i);
        }
    }

    function animatePathFinder(visitedNodes, shortestPathNodes) {
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                if (i === visitedNodes.length - 1) {
                    animateShortestPath(shortestPathNodes);
                }
                const currentNode = visitedNodes[i];
                if (!((currentNode.row === startNodePosition.row && currentNode.col === startNodePosition.col) || (currentNode.row === finishNodePosition.row && currentNode.col === finishNodePosition.col)))
                    document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-visited";
            }, (parseInt(config.speed)) * i);
        }
    }
    
    function animateShortestPath(shortestPathNodes) {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const currentNode = shortestPathNodes[i];
                if (!((currentNode.row === startNodePosition.row && currentNode.col === startNodePosition.col) || (currentNode.row === finishNodePosition.row && currentNode.col === finishNodePosition.col)))
                document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-shortest-path";
        }, 35 * i);
        }
    }

    function handleVisualizeButton() {
        const startNode = grid[startNodePosition.row][startNodePosition.col]; 
        const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
        const algorithmSelected = config.algorithm;
        const { visitedNodes, shortestPathNodes }= runAlgorithm(algorithmSelected, startNode, finishNode);
        animatePathFinder(visitedNodes, shortestPathNodes);
    }   

    function runAlgorithm(algorithmSelected, startNode, finishNode) {
        switch (algorithmSelected) {
            case "astar":
                const visitedNodesAstar = astar(grid, startNode, finishNode);
                const shortestPathNodesAstar = astarPath(finishNode);
                return { visitedNodes: visitedNodesAstar, shortestPathNodes: shortestPathNodesAstar };
            case "dijkstra":
                const visitedNodesDijkstra = dijkstra(grid, startNode, finishNode);
                const shortestPathNodes = dijkstraPath(finishNode); 
                return { visitedNodes: visitedNodesDijkstra, shortestPathNodes: shortestPathNodes };
            default:
            break;
        }
    }
                
    return (
        <>
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



export default Grid;
