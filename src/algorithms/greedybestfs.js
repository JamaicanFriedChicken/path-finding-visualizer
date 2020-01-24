import { getUnvisitedNeighbors } from "../algorithms/bfs";
import Heap from "heap";
import { euclideanDistance } from "../algorithms/astar";

var yetToVisit;

export function greedyBestFS(grid, startNode, finishNode) {
    // checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const visitedNodesInOrder = [];

    // creates a priority queue such that yetToVisit.pop() returns the node with the
    // lowest fCost value
    yetToVisit = new Heap(function(a, b) {
        return a.fCost - b.fCost;
    });

    // sets the hCost and fCost of every node in the grid to infinity
    initializeCosts(grid);

    // initializes start node's fCost to zero and adds it to the priority queue
    startNode.fCost = 0;
    yetToVisit.updateItem(startNode);
    yetToVisit.heapify();

    // Core loop
    while (yetToVisit.size() > 0) {
        // returns the node with the lowest fCost as the current node
        const currentNode = yetToVisit.pop();

        // if the current node is invalid, returns the visited nodes
        if (typeof currentNode === "undefined") return visitedNodesInOrder;

        // if the current node's fCost is infinity, returns the visited nodes
        if (currentNode.fCost === Infinity) return visitedNodesInOrder;

        // if the current node is a wall, skips the node
        if (currentNode.isWall) continue;

        // marks the current node as visited and pushes it to the list of visited nodes
        currentNode.visited = true;
        visitedNodesInOrder.push(currentNode);

        // if current node has found the finish node, returns the visited nodes
        if (currentNode === finishNode) return visitedNodesInOrder;

        // for all unvisited neighbors of the node, calculate the heuristics h(n)
        // Utilises Euclidean distance, then checks f(n) and updates the costs of the nodes respectively
        const unvisitedNeighbours = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbours) {
            if (!neighbor.isWall) {
                const hCost = euclideanDistance(
                    neighbor.col,
                    finishNode.col,
                    neighbor.row,
                    finishNode.row
                );

                if (neighbor.fCost > hCost) {
                    neighbor.fCost = hCost; //no g cost
                    neighbor.previousNode = currentNode;
                    yetToVisit.updateItem(neighbor);
                }
            }
        }
    }

    return visitedNodesInOrder;
}

// initializes the fcosts and hcosts of the nodes to infinity
function initializeCosts(grid) {
    for (let row of grid) {
        for (let node of row) {
            node.fCost = Infinity;
            node.hCost = Infinity;
            yetToVisit.push(node);
        }
    }
}
