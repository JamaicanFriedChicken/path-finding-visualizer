import { getUnvisitedNeighbors } from "../algorithms/dijkstra";
import Heap from "heap";
var yetToVisit;

export function astar(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const visitedNodesInOrder = [];

    yetToVisit = new Heap(function(a, b) {
        return a.fCost - b.fCost;
    });

    initializeCosts(grid);

    startNode.fCost = 0;
    startNode.gCost = 0;
    startNode.hCost = 0;

    yetToVisit.heapify();

    while (yetToVisit.length !== 0) {
        const currNode = yetToVisit.pop();

        if (typeof currNode === "undefined") return visitedNodesInOrder;

        if (currNode.isWall) continue;
        if (currNode.fCost === Infinity) return visitedNodesInOrder;

        currNode.visited = true;
        console.log(currNode);

        visitedNodesInOrder.push(currNode);

        if (currNode === finishNode) return visitedNodesInOrder;

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
    console.log(grid);
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
