import { Dijkstra as dijkstra, getShortestPath as dijkstraPath } from '../assets/algorithms/Dijkstra';
import { AStar as astar, getShortestPathAstar as astarPath } from '../assets/algorithms/AStar';

export const GRID_ROW_SIZE = 23;
export const GRID_COL_SIZE = 67;

export const START_NODE_POSITION = { row: 1, col: 1 };
export const FINISH_NODE_POSITION = { row: 21, col: 65};

function toggleWallGrid(grid, row, col) {
    const newGrid = grid.map((gridRow, rowIndex) =>
        gridRow.map((node, nodeIndex) => {
            if (rowIndex === row && nodeIndex === col) {
                return { ...node, isWall: !node.isWall };
            }
            return node;
        })
    );
    
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

function moveNode(grid, newRow, newCol, oldRow, oldCol) { 
    const newGrid = grid.map(row => row.slice());
    const oldNode = newGrid[oldRow][oldCol];
    const newNode = { ...oldNode, row: newRow, col: newCol };
    newGrid[oldRow][oldCol] = { ...grid[oldRow][oldCol], isStart: false, isFinish: false };
    newGrid[newRow][newCol] = newNode;
    return newGrid;
}

function createNode(row, col) {
    return {
        row,
        col,
        isVisited: false,
        isWall: false,
        isStart: row === START_NODE_POSITION.row && col === START_NODE_POSITION.col,
        isFinish: row === FINISH_NODE_POSITION.row && col === FINISH_NODE_POSITION.col,
        distance: Infinity,
        heuristic: 0,
        previousNode: null,
    };
}

function runAlgorithm(grid, algorithmSelected, startNode, finishNode) {
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

export { toggleWallGrid, initializeGrid, moveNode, runAlgorithm };