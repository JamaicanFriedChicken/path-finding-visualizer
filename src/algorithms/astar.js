import { getUnvisitedNeighbors } from "../algorithms/bfs";
import Heap from "heap";
var yetToVisit;

export function astar(grid, startNode, finishNode) {
    // check for invalid inputs
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

        // if node is undefined or current node has fCost of infinity, return list of visited nodes
        if (typeof currNode === "undefined" || currNode.fCost === Infinity)
            return visitedNodesInOrder;

        // if the node is a wall, perform loop again
        if (currNode.isWall) continue;

        // mark the node as visited and add to the list of visited nodes
        currNode.visited = true;
        visitedNodesInOrder.push(currNode);

        // if the node equals the finishNode, return the list of visited nodes
        if (currNode === finishNode) return visitedNodesInOrder;

        // for all unvisited neighbors of the node, calculate h(n),
        // we will be using manhattan distance. Then check the condition of g(n) and
        // update the costs of the node respectively.
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

export function euclideanDistance(colA, colB, rowA, rowB) {
    const a = Math.abs(colA - colB);
    const b = Math.abs(rowA - rowB);
    const aSquared = Math.pow(a, 2);
    const bSquared = Math.pow(b, 2);
    return Math.pow(aSquared + bSquared, 0.5);
}

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
