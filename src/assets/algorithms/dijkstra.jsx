function Dijkstra(grid, startNode, finishNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
        sortUnvisitedNodesByDistance(unvisitedNodes);
        //console.log("unvisitedNodes ", unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        //console.log("closestNode ", closestNode);

        if (closestNode.isWall) continue;
            
        if (closestNode.distance === Infinity) return visitedNodes;

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);    

        if (closestNode === finishNode) return visitedNodes;            
        updateUnvisitedNeighbors(grid, closestNode);
        //console.log("visited nodes ", visitedNodes);
    }
}

function updateUnvisitedNeighbors(grid, closestNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, closestNode);
    for (const node of unvisitedNeighbors) {
        node.distance = closestNode.distance + 1;
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

    //console.log("neighbors ", neighbors.filter(node => !node.isVisited));
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

export default Dijkstra;