import React, { useState, useEffect, useContext} from "react";
import Node from "./Node";
import '../assets/stylesheets/Grid.css';
import MyContext from "./MyContext";
import RandomMaze from "../assets/mazes/RandomMaze";
import BinaryTree from "../assets/mazes/BinaryTree";
import { toggleWallGrid, initializeGrid, moveNode, START_NODE_POSITION, FINISH_NODE_POSITION, GRID_ROW_SIZE, GRID_COL_SIZE } from "../utils/GridUtils";
import { animateMaze, runVisualizer } from "../utils/AnimationsUtils";

function Grid() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [nodePressed, setNodePressed] = useState(null);
    const [startNodePosition, setStartNodePosition] = useState(START_NODE_POSITION);
    const [finishNodePosition, setFinishNodePosition] = useState(FINISH_NODE_POSITION);
    const [animationInProgress, setAnimationInProgress] = useState(false);

    const { config } = useContext(MyContext);

    function handleOnMouseDown(row, col) {
        if (animationInProgress) return;
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
        if (animationInProgress || !mouseIsPressed || (grid[row][col].isStart) || (grid[row][col].isFinish) || grid[row][col].isWall) return;
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
    
    useEffect(() => {
        if (config.clear) {
            window.location.reload();
        }
    }, [config.clear])

    useEffect(() => {
        switch (config.maze) {
            case 'random':
                const randomWalls = RandomMaze(grid);
                animateMaze(randomWalls, config.speed);
                break;
            case 'binarytree':
                const binaryTreeWalls = BinaryTree(grid);
                animateMaze(binaryTreeWalls, config.speed);
                break;
            default:
                break;
        }
    }, [config.maze]);

    useEffect(() => {
        console.log(config);
        if (config.runAlgorithm) {
            if (config.algorithm !== "") {
                setAnimationInProgress(true);
                (async () => {
                    await runVisualizer(grid, startNodePosition, finishNodePosition, config.algorithm, config.speed);
                    setAnimationInProgress(false);
                })();        
            } else {
                console.log("ERROR");
            }
        }
    }, [config.runAlgorithm]);

    useEffect(() => {
        console.log(config);
        const newGrid = initializeGrid(GRID_ROW_SIZE, GRID_COL_SIZE);
        setGrid(newGrid);
        function handleDocumentMouseUp() {
            setMouseIsPressed(false);
        }
        document.addEventListener("mouseup", handleDocumentMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };
    }, []);
                
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
