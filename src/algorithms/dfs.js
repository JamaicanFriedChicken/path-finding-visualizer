import { getUnvisitedNeighbors } from "../algorithms/bfs";

var visitedNodesInOrder = [];
var finished = 0;

export function DFS(grid, startNode, finishNode) {
    visitedNodesInOrder = [];
    return DFSHelper(grid, startNode, finishNode);
}

function DFSHelper(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    if (startNode.isWall || startNode.visited) return;
    startNode.visited = true;

    visitedNodesInOrder.push(startNode);

    if (startNode === finishNode) {
        finished = 1;
        return visitedNodesInOrder;
    }

    var unvisitedNeighbours = getUnvisitedNeighbors(startNode, grid);

    for (var neighbour of unvisitedNeighbours) {
        if (!neighbour.isWall && !neighbour.visited) {
            neighbour.previousNode = startNode;
            if (finished === 1) {
                return visitedNodesInOrder;
            }
            DFSHelper(grid, neighbour, finishNode);
            if (finished === 1) {
                return visitedNodesInOrder;
            }
        }
    }

    return visitedNodesInOrder;
}
