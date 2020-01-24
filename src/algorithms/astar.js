import { getUnvisitedNeighbors } from "../algorithms/bfs";
import Heap from "heap";

var yetToVisit;

export function astar(grid, startNode, finishNode) {
    // checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodesInOrder = [];

    // create a priority queue where heap.pop() is the node with the lowest fCost
    yetToVisit = new Heap(function(a, b) {
        return a.fCost - b.fCost;
    });

    // make all nodes have fCost, gCost, hCost infinity at first
    initializeCosts(grid);

    // set the costs of the startNode to 0
    startNode.fCost = 0;
    startNode.gCost = 0;
    startNode.hCost = 0;

    // create a priority queue using a min-heap
    yetToVisit.heapify();

    while (yetToVisit.length !== 0) {
        const currNode = yetToVisit.pop();

        // if node is undefined or current node has fCost of infinity, returns the list of visited nodes
        if (typeof currNode === "undefined" || currNode.fCost === Infinity)
            return visitedNodesInOrder;

        // if the node is a wall, continues running
        if (currNode.isWall) continue;

        // marks the node as visited and add it to the list of visited nodes
        currNode.visited = true;
        visitedNodesInOrder.push(currNode);

        // if the node equals the finish node, returns the list of visited nodes
        if (currNode === finishNode) return visitedNodesInOrder;

        // for all unvisited neighbors of the node, calculate the heuristic h(n),
        // Manhattan distance is used for calculating h(n). Then checks the condition of g(n) and
        // updates the costs of the node respectively.
        const unvisitedNeighbours = getUnvisitedNeighbors(currNode, grid);
        for (const neighbor of unvisitedNeighbours) {
            if (!neighbor.isWall) {
                let hCost = manhattanDistance(
                    neighbor.col,
                    finishNode.col,
                    neighbor.row,
                    finishNode.row
                );

                if (currNode.gCost + 1 < neighbor.gCost) {
                    neighbor.hCost = hCost;
                    neighbor.gCost = currNode.gCost + 1;
                    neighbor.fCost = neighbor.hCost + neighbor.gCost;
                    neighbor.previousNode = currNode;
                    yetToVisit.updateItem(neighbor);
                }
            }
        }
    }
    return visitedNodesInOrder;
}

// calculates the Euclidean distance
export function euclideanDistance(colA, colB, rowA, rowB) {
    const a = Math.abs(colA - colB);
    const b = Math.abs(rowA - rowB);
    const aSquared = Math.pow(a, 2);
    const bSquared = Math.pow(b, 2);
    return Math.pow(aSquared + bSquared, 0.5);
}

// calculates the Manhanttan distance
export function manhattanDistance(colA, colB, rowA, rowB) {
    const a = Math.abs(colA - colB);
    const b = Math.abs(rowA - rowB);
    return a + b;
}

// Make all nodes' fCost, gCost and hCost values initialized to infinity
// and stores it in the heap.
function initializeCosts(grid) {
    for (let row of grid) {
        for (let node of row) {
            node.fCost = Infinity;
            node.gCost = Infinity;
            node.hCost = Infinity;
            yetToVisit.push(node);
        }
    }
}
