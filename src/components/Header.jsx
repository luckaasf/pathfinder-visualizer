import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/stylesheets/Header.css';
import MyContext from "./MyContext";

function Header() {

    const { startAlgorithm } = useContext(MyContext);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [selectedSpeed, setSelectedSpeed] = useState("20");
    const [selectedMaze, setSelectedMaze] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedAlgorithm !== "") {
            startAlgorithm(false, selectedAlgorithm, selectedSpeed, selectedMaze);
        }
    }, [selectedAlgorithm]);

    function handleAlgorithmChange(event) {
        setSelectedAlgorithm(event.target.value);
    }

    useEffect(() => {
        if (selectedSpeed !== "medium")
            startAlgorithm(false, selectedAlgorithm, selectedSpeed, selectedMaze);
        else 
            startAlgorithm(false, selectedAlgorithm, "medium");
    }, [selectedSpeed]);


    function handleSpeedChange(event) {
        setSelectedSpeed(event.target.value);
    }

    useEffect(() => {
        if (isRunning !== false) 
            startAlgorithm(isRunning, selectedAlgorithm, selectedSpeed, selectedMaze);
    }, [isRunning]);

    function handleClick() {
        setIsRunning(true);
    }

    useEffect(() => {
        if (selectedMaze !== "")
            startAlgorithm(isRunning, selectedAlgorithm, selectedSpeed, selectedMaze);
    }, [selectedMaze]);

    function handleMazeChange(event) {
        setSelectedMaze(event.target.value);
    }

    function handlePopUpChange() {
        navigate("/login");
    }

    return(
        <header className="header-container">
            <a href="/" className="title-project">Pathfinder Visualizer</a>
            <div className="visualize-container">
            <select className="maze" value={selectedMaze} onChange={handleMazeChange}>
                <option value="">Maze</option>
                <option value="random">Random maze</option>
                <option value="binarytree">Binary Tree</option>
            </select>
            <select className="dropdown" value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                <option value="">Choose an algorithm</option>
                <option value="dijkstra">Dijkstra</option>
                <option value="astar">A*</option>
            </select>  
            <button className="visualize-button" onClick={handleClick}><span>Visualize</span></button>
            <select className="speed" value={selectedSpeed} onChange={handleSpeedChange}>
                <option value="100">Slow</option>
                <option value="20">Medium</option>
                <option value="3">Fast</option>
            </select>
            </div>
            <button className="login-button" onClick={handlePopUpChange} alt="Log In" title="Log In">
                <span className="login-icon">&#x2386;</span>
            </button>
        </header>
    );
}

export default Header;