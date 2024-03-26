import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/stylesheets/Header.css';
import MyContext from "./MyContext";

function Header() {

    const { startAlgorithm } = useContext(MyContext);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [selectedSpeed, setSelectedSpeed] = useState("20");
    const [selectedMaze, setSelectedMaze] = useState("");
    const [runAlgorithm, setRunAlgorithm] = useState(false);
    const [clearGrid, setClearGrid] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("username") !== null;

    useEffect(() => {
        if (selectedAlgorithm !== "") {
            startAlgorithm(false, selectedAlgorithm, selectedSpeed, selectedMaze, false);
        }
    }, [selectedAlgorithm]);

    function handleAlgorithmChange(event) {
        setSelectedAlgorithm(event.target.value);
    }

    useEffect(() => {
        if (selectedSpeed !== "medium")
            startAlgorithm(false, selectedAlgorithm, selectedSpeed, selectedMaze, false);
        else 
            startAlgorithm(false, selectedAlgorithm, "medium", selectedMaze, false);
    }, [selectedSpeed]);


    function handleSpeedChange(event) {
        setSelectedSpeed(event.target.value);
    }

    useEffect(() => {
        if (runAlgorithm !== false) 
            startAlgorithm(runAlgorithm, selectedAlgorithm, selectedSpeed, selectedMaze, false);
    }, [runAlgorithm]);

    function handleClick() {
        setRunAlgorithm(true);
    }

    useEffect(() => {
        if (selectedMaze !== "")
            startAlgorithm(runAlgorithm, selectedAlgorithm, selectedSpeed, selectedMaze, false);
    }, [selectedMaze]);

    function handleMazeChange(event) {
        setSelectedMaze(event.target.value);
    }

    useEffect(() => {
        if (clearGrid !== false)
            startAlgorithm(runAlgorithm, selectedAlgorithm, selectedSpeed, selectedMaze, clearGrid);
    }, [clearGrid])

    function handleClearChange() {
        setClearGrid(true);
    }

    function handlePopUpChange() {
        navigate("/login");
    }


    function handleLogoutChange() {
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem("token")}`
            },
        })
        .then(response => {
            console.log("Successful Log out");
            localStorage.clear();
            window.location.reload();
        })
        .catch(error => console.log("Error ", error))
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
                <option value="8">Fast</option>
            </select>
            <button className="clear-button" onClick={(handleClearChange)}><span>Reset</span></button>
            </div>
            {!isLoggedIn && 
                <button className="login-button" onClick={handlePopUpChange} alt="Log In" title="Log In">
                    <span className="login-icon">&#x2386;</span>
                </button>
            }

            {isLoggedIn &&
                <div className="user-info">Logged in as {localStorage.getItem("username")}</div>
            }
            {isLoggedIn &&
                <button className="logout-button" onClick={handleLogoutChange} alt="Log Out" title="Log Out">
                    <span className="logout-icon">&#x21AA;</span>
                </button>
            }
        </header>
    );
}

export default Header;