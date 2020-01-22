import { getUnvisitedNeighbors } from "../algorithms/bfs";
import Heap from "heap";
import { euclideanDistance } from "../algorithms/astar";

var yetToVisit;

export function greedyBestFS(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    const visitedNodesInOrder = [];

    yetToVisit = new Heap(function(a, b) {
        return a.fCost - b.fCost;
    });

    initializeCosts(grid);

    startNode.fCost = 0;

    yetToVisit.updateItem(startNode);
    yetToVisit.heapify();

    while (yetToVisit.size() > 0) {
        const currNode = yetToVisit.pop();

        if (typeof currNode === "undefined") return visitedNodesInOrder;
        if (currNode.fCost === Infinity) return visitedNodesInOrder;

        if (currNode.isWall) continue;

        currNode.visited = true;

        visitedNodesInOrder.push(currNode);

        if (currNode === finishNode) return visitedNodesInOrder;

        const unvisitedNeighbours = getUnvisitedNeighbors(currNode, grid);

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
                    neighbor.previousNode = currNode;
                    yetToVisit.updateItem(neighbor);
                }
            }
        }
    }

    return visitedNodesInOrder;
}

function initializeCosts(grid) {
    for (let row of grid) {
        for (let node of row) {
            node.fCost = Infinity;
            node.hCost = Infinity;
            yetToVisit.push(node);
        }
    }
}
