import { getUnvisitedNeighbors } from "../algorithms/bfs";

var visitedNodesInOrder = [];
var finished = 0;

export function DFS(grid, startNode, finishNode) {
    visitedNodesInOrder = [];
    return DFSHelper(grid, startNode, finishNode);
}

// loops around the node and dives deeper into its neighbors in search of the finish node.
function DFSHelper(grid, startNode, finishNode) {
    // checks for invalid inputs
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    // returns if start node is a wall or has been visited
    if (startNode.isWall || startNode.visited) return;
    startNode.visited = true;

    // pushes the start node into the visited nodes list
    visitedNodesInOrder.push(startNode);

    // when the finish node has been found, returns the list of visited nodes
    if (startNode === finishNode) {
        finished = 1;
        return visitedNodesInOrder;
    }

    // fetches the unvisited neighbors
    var unvisitedNeighbours = getUnvisitedNeighbors(startNode, grid);

    // loops into itself for each neighbor of the unvisited neighbors until finish node has been discovered
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
