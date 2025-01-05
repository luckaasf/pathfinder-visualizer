import { runAlgorithm } from "./GridUtils";

function animateMaze(walls, speed) {
    for (let i = 0; i < walls.length; i++) {
        setTimeout(() => {
            const currentNode = walls[i];
            document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-wall";
        }, (parseInt(speed)) * i);
    }
}

function animatePathFinder(visitedNodes, shortestPathNodes, startNodePosition, finishNodePosition, speed) {
    return new Promise(resolve => {
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                if (i === visitedNodes.length - 1) {
                    animateShortestPath(shortestPathNodes, startNodePosition, finishNodePosition).then(resolve);
                }
                const currentNode = visitedNodes[i];
                if (!((currentNode.row === startNodePosition.row && currentNode.col === startNodePosition.col) || (currentNode.row === finishNodePosition.row && currentNode.col === finishNodePosition.col)))
                    document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-visited";
            }, (parseInt(speed)) * i);
        }
    });
}

function animateShortestPath(shortestPathNodes, startNodePosition, finishNodePosition) {
    return new Promise(resolve => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const currentNode = shortestPathNodes[i];
                if (!((currentNode.row === startNodePosition.row && currentNode.col === startNodePosition.col) || (currentNode.row === finishNodePosition.row && currentNode.col === finishNodePosition.col)))
                    document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className="node node-shortest-path";
                if (i === shortestPathNodes.length - 1) {
                    resolve();
                }
            }, 35 * i);
        }
    });
}

async function runVisualizer(grid, startNodePosition, finishNodePosition, algorithm, speed) {
    const startNode = grid[startNodePosition.row][startNodePosition.col]; 
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const { visitedNodes, shortestPathNodes } = runAlgorithm(grid, algorithm, startNode, finishNode);
    await animatePathFinder(visitedNodes, shortestPathNodes, startNodePosition, finishNodePosition, speed);
}

export { animateMaze, animatePathFinder, runVisualizer }; 