# Pathfinder Visualizer

Path Visualizer is a web application built with React that provides an interactive environment for visualizing pathfinding algorithms such as Dijkstra and A* (A-star). Users can manipulate the grid by creating and destroying walls, moving start and end nodes, creating random mazes or using algorithms such as Binary Tree, and finally adjust visualization speed to gain insights into how these algorithms work.

![Visualizer](./src/assets/gifs/showcase.gif)

## Contents

- [Tech](#languages)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Tech

- **Front End:** Javascript (ReactJS)
- **Back End:** Python (Django)
- **Database:** PostgreSQL

## Features

- **Pathfinding Algorithms:** Utilizes Dijkstra and A* algorithms to find the shortest path between nodes on a grid.
- **Speed Control:** Allows users to control the speed of the visualization, providing options for slow, medium, and fast rendering.
- **Interactive Grid:** Users can interact with the grid by toggling walls, and relocating the start and end points to observe the algorithm's behavior.
- **Maze Generation:** Added features to generate mazes. Users can currently generate random mazes and binary tree mazes.
- **Back End:** For now users can only create an account, log in and log out.

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

4. **Django Server Initialization (Optional --> Users can still use the grid, algorithms, mazes and speed even without logging in):**

    ```bash
    # Navigate to the backend directory
    cd backend
    
    # Create a virtual environment
    python -m venv env
    
    # Activate the virtual environment (Windows)
    env\Scripts\activate
    
    # Install Django and other dependencies
    pip install -r requirements.txt
    
    # Apply migrations
    python manage.py migrate
    
    # Start the Django development server
    python manage.py runserver
    ```

5. **PostgreSQL Instalation (Optional --> Users can still use the grid, algorithms, mazes and speed even without logging in):**

    1. Install postgreSQL at https://www.postgresql.org/download/ and set up the following data base fields at settings.py:

        - Database name
        - User
        - Password
        - Host
        - Port

## Usage

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your web browser and visit http://localhost:3000 to access the React application.

3. Open another tab or window in your web browser and visit http://localhost:8000 to access the Django application.

4. Open the pgAdmin to initialize the postgreSQL database

4. Interact with the visualizer:

   - Click on individual nodes to toggle walls, or click and drag to create multiple walls.
   - Click and drag the start and end nodes to reposition them.
   - Control the visualization speed.