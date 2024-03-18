function BinaryTree(grid) {
    const newGrid = grid.map(row => row.slice());
    const binaryTreeWalls = [];

    for (const row of newGrid) {
        for (const node of row) {
            
            if (node.isStart || node.isFinish) continue;

            if (node.row % 2 === 0 || node.col % 2 === 0) {
                node.isWall = true;
                binaryTreeWalls.push(node);
            }

        }
    }
    for (let row = 1; row < newGrid.length; row += 2) {
        for (let col = 1; col < newGrid[0].length; col += 2) {

            const randomDirection = Math.random();

            if (row === newGrid.length - 2 && col === newGrid[0].length - 2) {
                continue;
            } else if (row === newGrid.length - 2) {
                removeFromArray(binaryTreeWalls, newGrid[row][col + 1]); // right
            } else if (col === newGrid[0].length - 2) {
                removeFromArray(binaryTreeWalls, newGrid[row + 1][col]); // bottom
            } else {
                if (randomDirection < 0.5) {
                    removeFromArray(binaryTreeWalls, newGrid[row][col + 1]); // right
                } else {
                    removeFromArray(binaryTreeWalls, newGrid[row + 1][col]); // bottom
                }
            }
        }
    }

    return binaryTreeWalls;
}

function removeFromArray(binaryTreeWalls, node) {
    for (let i = 0; i < binaryTreeWalls.length; i++) {
        if (binaryTreeWalls[i].row === node.row && binaryTreeWalls[i].col === node.col) {
            binaryTreeWalls[i].isWall = false;
            binaryTreeWalls.splice(i, 1);
        }
    }
    return binaryTreeWalls;
}

export default BinaryTree;

