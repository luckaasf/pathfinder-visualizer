# Path Visualizer

Path Visualizer is a web application built with React that provides an interactive environment for visualizing pathfinding algorithms such as Dijkstra and A* (A-star). Users can manipulate the grid, create walls, move start and end nodes, and adjust visualization speed to gain insights into how these algorithms work.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Pathfinding Algorithms:** Utilizes Dijkstra and A* algorithms to find the shortest path between nodes on a grid.
- **Speed Control:** Allows users to control the speed of the visualization, providing options for slow, medium, and fast rendering.
- **Interactive Grid:** Users can interact with the grid by toggling walls, and relocating the start and end points to observe the algorithm's behavior.

## Installation

1. Clone this repository to your local machine using Git:

    ```bash
    git clone https://github.com/luckaasf/pathfinder-visualizer.git
    ```

2. Navigate into the project directory:

    ```bash
    cd pathfinder-visualizer
    ```

3. Install dependencies using npm:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your web browser and visit http://localhost:3000 to access the application.

3. Interact with the visualizer:

   - Click on individual nodes to toggle walls, or click and drag to create multiple walls.
   - Click and drag the start and end nodes to reposition them.
   - Control the visualization speed.