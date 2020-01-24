import { getAllFourNeighbors } from "../algorithms/bfs";

export var INTERSECT_NODE_ROW;
export var INTERSECT_NODE_COL;

export function biDirectional(grid, startNode, finishNode) {
    INTERSECT_NODE_ROW = -1;
    INTERSECT_NODE_COL = -1;
    // checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const visitedNodesInOrder = [];

    // initializes two queues, one queue for the start node and one for the finish node
    // adds the start and finish nodes into the queue respectively
    var queueStart = new Queue();
    var queueFinish = new Queue();
    queueStart.enqueue(startNode);
    queueFinish.enqueue(finishNode);

    // Core
    while (queueStart.length !== 0 && queueFinish.length !== 0) {
        var currStartNode = queueStart.dequeue();
        var currFinishNode = queueFinish.dequeue();

        // checks for if start node or finish node is invalid
        if (typeof currStartNode === "undefined") {
            return visitedNodesInOrder;
        }
        if (typeof currFinishNode === "undefined") {
            return visitedNodesInOrder;
        }

        // marks the removed from nodes as visited and adds them to the visited nodes list
        currStartNode.visited = true;
        currFinishNode.visited = true;
        visitedNodesInOrder.push(currStartNode);
        visitedNodesInOrder.push(currFinishNode);

        // if start and finish node intersects each other, returns the visited nodes
        if (isIntersecting(visitedNodesInOrder)) {
            return visitedNodesInOrder;
        }

        // fetches the neighboring nodes for the start and finish node
        const unvisitedNeighborsStart = getUnvisitedNeighborsStart(
            currStartNode,
            grid
        );
        const unvisitedNeighborsFinish = getUnvisitedNeighborsFinish(
            currFinishNode,
            grid
        );

        // for every unvisited neighbor of the two nodes
        // push them into their respective queues
        for (const neighbor of unvisitedNeighborsStart) {
            if (!neighbor.isWall) {
                neighbor.visited = true;
                neighbor.visitedByStart = true;
                neighbor.previousNode = currStartNode;
                queueStart.enqueue(neighbor);
            }
        }

        for (const neighbor of unvisitedNeighborsFinish) {
            if (!neighbor.isWall) {
                neighbor.visited = true;
                neighbor.visitedByFinish = true;
                neighbor.previousNode = currFinishNode;
                queueFinish.enqueue(neighbor);
            }
        }
    }
}

// checks to see if the nodes are intersecting
function isIntersecting(visitedNodesInOrder) {
    for (var node of visitedNodesInOrder) {
        if (node.visitedByStart && node.visitedByFinish && !node.isWall) {
            INTERSECT_NODE_ROW = node.row;
            INTERSECT_NODE_COL = node.col;
            return true;
        }
    }
    return false;
}

// returns all the neighbors of the start node from the grid
function getUnvisitedNeighborsStart(node, grid) {
    var neighbors = getAllFourNeighbors(node, grid);
    // keep neighbors that are unvisited OR visited by finishNode
    return neighbors.filter(
        neighbor => neighbor.visitedByFinish || !neighbor.visited
    );
}

// returns all the neighbors of the finish node from the grid
function getUnvisitedNeighborsFinish(node, grid) {
    var neighbors = getAllFourNeighbors(node, grid);
    // keep neighbors that are unvisited OR visited by startNode
    return neighbors.filter(
        neighbor => neighbor.visitedByStart || !neighbor.visited
    );
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
