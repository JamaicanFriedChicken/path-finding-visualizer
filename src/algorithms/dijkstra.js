// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm

import Heap from "heap";

var heap;

// when beginning, assume all nodes in the grid to have a distance of infinity
export function dijkstra(grid, startNode, finishNode) {
    // checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    // creates a priority queue of nodes where heap.pop()
    // outputs the node with the smallest distance
    heap = new Heap(function(a, b) {
        return a.distance - b.distance;
    });
    const visitedNodesInOrder = [];

    // initializes the starting node's distance to zero
    startNode.distance = 0;

    // adds all the nodes in the grid to the heap
    getAllNodes(grid);

    // creates a minimum heap
    heap.heapify();

    // Core
    while (heap.length !== 0) {
        //shift returns first element in array (with the smallest distance)
        const closestNode = heap.pop();

        // if closest node is a wall, skips the node
        if (closestNode.isWall) continue;

        // if closest node's distance is infinity, returns a list of the  visited nodes
        // This means the shortest path to the finish node does not exist
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        //marks the closest node as visited and appends it to those visited in order
        closestNode.visited = true;
        visitedNodesInOrder.push(closestNode);

        // if we have arrived at the finish node, returns all the nodes visited
        if (closestNode === finishNode) return visitedNodesInOrder;

        // for all the unvisited neighbors, updates their distances respectively
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

// Return all the nodes in the given grid and puts them into the heap
function getAllNodes(grid) {
    for (const row of grid) {
        for (const node of row) {
            heap.push(node);
        }
    }
}

// updates the distance for all the unvisited neighbors of node in grid
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.distance > node.distance + 1) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
            heap.updateItem(neighbor);
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

// return all the neighbors of node from grid
export function getUnvisitedNeighbors(node, grid) {
    var neighbors = getAllFourNeighbors(node, grid);
    // get rid of neighbors that were already visited
    return neighbors.filter(neighbor => !neighbor.visited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    //  if (!finishNode.visited || finishNode.isWall) return [];
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
