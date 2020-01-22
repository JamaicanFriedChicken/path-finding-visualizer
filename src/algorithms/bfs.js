// import { getUnvisitedNeighbors } from "../algorithms/dijkstra";
//import Queue from "../Components/Queue";

export function BFS(grid, startNode, finishNode) {
    //check for illegal inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodesInOrder = [];
    var q = new Queue(); //create a new queue

    //initialize the start node distance to 0 and add it to the queue
    startNode.distance = 0;
    q.enqueue(startNode);

    while (q.length !== 0) {
        var currNode = q.dequeue();

        //guard against invalid nodes
        if (typeof currNode === "undefined") return visitedNodesInOrder;

        //if the node is a wall, repeat the loop again
        if (currNode.isWall) continue;

        currNode.distance = 0;
        currNode.visited = true;
        visitedNodesInOrder.push(currNode);

        if (currNode === finishNode) return visitedNodesInOrder;

        const unvisitedNeighbours = getUnvisitedNeighbors(currNode, grid);

        for (const neighbor of unvisitedNeighbours) {
            if (!neighbor.isWall) {
                q.enqueue(neighbor);
                neighbor.visited = true;
                neighbor.previousNode = currNode;
                neighbor.distance = 0;
            }
        }
    }
}

export function getAllFourNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}

export function getUnvisitedNeighbors(node, grid) {
    var neighbors = getAllFourNeighbors(node, grid);
    // get rid of neighbors that were already visited
    return neighbors.filter(neighbor => !neighbor.visited);
}

// function BFScommented(grid, startNode, finishNode) {
//   //check for illegal inputs
//   if (!startNode || !finishNode || startNode === finishNode) {
//     return false;
//   }
//   const visitedNodesInOrder = [];
//   var q = new Queue(); //create a new queue

//   //initialize the start node distance to 0 and add it to the queue
//   startNode.distance = 0;
//   q.enqueue(startNode);

//   while (q.length !== 0) {
//     var currNode = q.dequeue();

//     //guard against invalid nodes
//     if (typeof currNode === "undefined") return visitedNodesInOrder;

//     //if the node is a wall, repeat the loop again
//     if (currNode.isWall) continue;

//     //mark the node as visited and add it to the list of visited nodes
//     currNode.visited = true;
//     visitedNodesInOrder.push(currNode);

//     //if the current node equals the finish node, return the list of visited nodes
//     if (currNode === finishNode) return visitedNodesInOrder;

//     //get univisited neighbors of the current node and add them to the queue
//     const unvisitedNeighbours = getUnvisitedNeighbors(currNode, grid);
//     for (const neighbor of unvisitedNeighbours) {
//       if (!neighbor.isWall) {
//         q.enqueue(neighbor);
//         neighbor.visited = true;
//         neighbor.previousNode = currNode;
//       }
//     }
//   }
// }

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
