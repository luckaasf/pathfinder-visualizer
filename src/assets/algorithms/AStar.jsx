function calculateManhattanHeuristic(currentNode, finishNode) {
    return Math.abs(currentNode.row - finishNode.row) + Math.abs(currentNode.col - finishNode.col);
}

function calculateEuclideanDistance(nodeA, nodeB) {
    return Math.sqrt(Math.pow(nodeA.row - nodeB.row, 2) + Math.pow(nodeA.col - nodeB.col, 2));
}

function AStar(grid, startNode, finishNode) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;
    startNode.heuristic = calculateManhattanHeuristic(startNode, finishNode);

    while (!!unvisitedNodes.length) {
        sortUnvisitedNodesByDistance(unvisitedNodes, finishNode);

        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;

        if (closestNode.distance === Infinity) return visitedNodes;
        
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if (closestNode === finishNode) return visitedNodes; 

        updateNeighbors(closestNode, grid, finishNode);
        
        console.log(visitedNodes);
    }

}

function sortUnvisitedNodesByDistance(unvisitedNodes, finishNode) {
    unvisitedNodes.sort((nodeA, nodeB) => {
        const costA = nodeA.distance + nodeA.heuristic;
        const costB = nodeB.distance + nodeB.heuristic;
        
        if (costA === costB) {
            return(
                calculateEuclideanDistance(nodeA, finishNode) - calculateEuclideanDistance(nodeB, finishNode)
            );
        } else {
            return costA - costB;
        }

    });
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}

function updateNeighbors(currentNode, grid, finishNode) {
    const neighbors = getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
        
        const newDistance = currentNode.distance + 1;
        const newHeuristic = calculateManhattanHeuristic(neighbor, finishNode);
        const newCost = newDistance + newHeuristic;
        
        if (newCost < neighbor.distance + neighbor.heuristic) {
            neighbor.distance = newDistance;
            neighbor.heuristic = newHeuristic;
            neighbor.previousNode = currentNode;
        }
    }
}

function getNeighbors(currentNode, grid) {
    const neighbors = [];
    const row = currentNode.row;
    const col = currentNode.col;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(node => !node.isVisited);

}

function getShortestPathAstar(finishNode) {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while(currentNode !== null) {
        shortestPathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
}
  
export { AStar, getShortestPathAstar };