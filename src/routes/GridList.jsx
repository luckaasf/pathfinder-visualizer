import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GridCard from "../components/GridCard";
import "../assets/stylesheets/GridList.css";
import MyContextProvider from "../components/MyContextProvider";
import Pagination from '../components/Pagination';

function GridList() {
        
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const [grids, setGrids] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grids/${username}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Error on response ", response.statusText);
            }
        })
        .then(data => {
            console.log("DATA: ", data);
            setGrids(data);
        })
        .catch(error => console.log("Error ", error))
    }, [])

    useEffect(() => {
        console.log("GRIDS: ", grids);
    }, [grids])
    
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <MyContextProvider>
            <Header />
            <div className="grid-list-container">
                {grids.map(grid => (
                    <div key={grid.id} className="grid-card-wrapper">
                        <GridCard
                            algorithm={grid.algorithm}
                            grid_name={grid.grid_name}
                            image={grid.image}
                            maze={grid.maze}
                            speed={grid.speed}
                            user={grid.user}
                        />
                    </div>
                ))}
            </div>
            <Pagination
                postsPerPage={2}
                length={grids.length}
                handlePagination={handlePagination}
            />
        </MyContextProvider>
    );
}

export default GridList;
