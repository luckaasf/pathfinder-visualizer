function RandomMaze(grid) {
    const newGrid = grid.map(row => row.slice());
    const randomWalls = [];

    for (const row of newGrid) {
        for (const node of row) {
            if (node.isStart || node.isFinish)
                continue;
            const randomNumber = Math.random(); 
            if (randomNumber < 0.25) {
                node.isWall = true;
                randomWalls.push(node);
            }   
        }
    }

    return randomWalls;
}

export default RandomMaze;