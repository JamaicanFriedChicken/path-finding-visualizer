export function BFS(grid, startNode, finishNode) {
    //checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodesInOrder = [];
    //creates a new queue
    var queue = new Queue();

    //initialize the start node distance to 0 and add it to the queue
    startNode.distance = 0;
    queue.enqueue(startNode);

    while (queue.length !== 0) {
        var currentNode = queue.dequeue();

        // checks for any invalid nodes
        if (typeof currentNode === "undefined") return visitedNodesInOrder;

        //if the node is a wall, repeat the loop again
        if (currentNode.isWall) continue;

        // marks the node as visited and adds it to the list of visited nodes
        currentNode.distance = 0;
        currentNode.visited = true;
        visitedNodesInOrder.push(currentNode);

        // if the current node arrives at the goal, returns the list of the visited nodes
        if (currentNode === finishNode) return visitedNodesInOrder;

        // fetches the unvisited neighbors of the current node and adds them to the queue
        const unvisitedNeighbours = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbours) {
            if (!neighbor.isWall) {
                queue.enqueue(neighbor);
                neighbor.visited = true;
                neighbor.previousNode = currentNode;
                neighbor.distance = 0;
            }
        }
    }
}

// fetches the neighbors(up, down, left and right) of the current node
export function getAllFourNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}

// returns all the neighbors of the node from the grid
export function getUnvisitedNeighbors(node, grid) {
    var neighbors = getAllFourNeighbors(node, grid);
    // get rid of neighbors that were already visited
    return neighbors.filter(neighbor => !neighbor.visited);
}

/*
Queue.js
A function to represent a queue
Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode
*/

function Queue() {
    // initialise the queue and offset
    var queue = [];
    var offset = 0;

    // Returns the length of the queue.
    this.getLength = function() {
        return queue.length - offset;
    };

    // Returns true if the queue is empty, and false otherwise.
    this.isEmpty = function() {
        return queue.length === 0;
    };

    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    this.enqueue = function(item) {
        queue.push(item);
    };

    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    this.dequeue = function() {
        // if the queue is empty, return immediately
        if (queue.length === 0) return undefined;

        // store the item at the front of the queue
        var item = queue[offset];

        // increment the offset and remove the free space if necessary
        if (++offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }

        // return the dequeued item
        return item;
    };

    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    this.peek = function() {
        return queue.length > 0 ? queue[offset] : undefined;
    };
}
