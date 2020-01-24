export function simpleMaze(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const turnNodesToWalls = [];

    // Randomly turns nodes into walls based on the range provided for
    // getRandomNumber function.
    for (const row of grid) {
        for (const node of row) {
            if (getRandomNumber(0, 100) < 50 && getRandomNumber(0, 4) < 2) {
                if (!node.isStart && !node.isFinish) {
                    turnNodesToWalls.push(node);
                    node.isWall = true;
                }
            }
        }
    }
    return turnNodesToWalls;
}

// Generates a random number between a minimum value and maximum value.
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
