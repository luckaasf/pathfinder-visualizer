function Dijkstra(grid, startNode, finishNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
        sortUnvisitedNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // skip walls
        if (closestNode.isWall) continue;
        // if it gets to this point it means there is no path
        if (closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);    
        // path was found
        if (closestNode === finishNode) return visitedNodes;            
        updateUnvisitedNeighbors(grid, closestNode);
    }
}

function updateUnvisitedNeighbors(grid, closestNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, closestNode);
    for (const node of unvisitedNeighbors) {
        node.distance = closestNode.distance + 1;
        node.previousNode = closestNode;
    }
}

function getUnvisitedNeighbors(grid, closestNode) {
    const neighbors = [];
    const row = closestNode.row;
    const col = closestNode.col;
    // the only neighbors are the left, right, top and bottom nodes
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(node => !node.isVisited);
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

function sortUnvisitedNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getShortestPath(finishNode) {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
}

export { Dijkstra, getShortestPath };