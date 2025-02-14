import React, { useState, useEffect, useContext, useRef } from "react";
import { useScreenshot, createFileName } from 'use-react-screenshot';
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
    const [isDone, setIsDone] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [imageName, setImageName] = useState("");

    const isLoggedIn = localStorage.getItem("username") !== null;

    const { config } = useContext(MyContext);

    const popupRef = useRef(null);
    const ref = useRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);

    const download = (iImage, { name = 'img', extension = 'png' } = {}) => {
        const a = document.createElement('a')
        a.href = iImage
        a.download = createFileName(extension, name)
        a.click()
    }

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
        if (config.runAlgorithm) {
            if (config.algorithm !== "") {
                setAnimationInProgress(true);
                (async () => {
                    await runVisualizer(grid, startNodePosition, finishNodePosition, config.algorithm, config.speed);
                    setAnimationInProgress(false);
                    setIsDone(true);
                })();        
            }
        }
    }, [config.runAlgorithm]);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (isPopupOpen && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        };
    }, [isPopupOpen])
    
    useEffect(() => {
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
            
    function downloadScreenshot() {
        takeScreenshot(ref.current).then(download);
    }

    function handlePopUpChange() {
        setIsPopupOpen(true);
    }

    async function handleSaveSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const algorithm = config.algorithm;
        const maze = config.maze;
        const speed = config.speed;
    
        try {
            const image = await takeScreenshot(ref.current);
            const blob = await fetch(image).then(res => res.blob());
    
            const formData = new FormData();
            formData.append("grid_name", imageName);
            formData.append("user", id);
            formData.append("image", blob, imageName + ".png");
            formData.append("algorithm", algorithm);
            formData.append("maze", maze);
            formData.append("speed", speed);
    
            const response = await fetch('http://127.0.0.1:8000/api/grids/save/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });
    
            if (response.ok) {
                alert("Grid Saved");
                setIsPopupOpen(false);
            } else {
                const errorData = await response.json();
                alert("Error on save grid endpoint: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.log("Error capturing screenshot:", error);
        }
    }
    
    return (
        <>
            <div className={`grid ${isPopupOpen ? 'blurred' : ''}`} ref={ref}>
            {isDone && 
                <div className="download-container">
                    <button className="download-button" onClick={downloadScreenshot}><span>Download</span></button>
                </div>
            }
            {isLoggedIn && isDone &&
                <div className="download-container">
                    <button className="download-button" onClick={downloadScreenshot}><span>Download</span></button>
                    <button className="download-button" onClick={handlePopUpChange}><span>Save</span></button>
                </div>
            }
            {isPopupOpen &&
                <div className="popup-container" ref={popupRef}>
                    <form className="save-form" onSubmit={handleSaveSubmit}>
                        <div className="save-box">
                            <input type="text" name="grid_name" placeholder="Grid Name" onChange={(e) => setImageName(e.target.value)} required></input>
                        </div>
                        <button type="submit" className="save-button" >Confirm</button>
                    </form>
                </div>
            }
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

