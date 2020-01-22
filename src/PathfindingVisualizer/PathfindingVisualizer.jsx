import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { BFS } from "../algorithms/bfs";
import { DFS } from "../algorithms/dfs";
import { greedyBestFS } from "../algorithms/greedybestfs";
import { biDirectional } from "../algorithms/BiDirectional";

import "./PathfindingVisualizer.css";

export const NUM_COLUMNS = 50;
export const NUM_ROWS = 20;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: []
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-shortest-path";
            }, 50 * i);
        }
    }

    visualizeAlgorithm(algorithm) {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        var nodesInShortestPathOrder;

        var visitedNodesInOrder = null;
        switch (algorithm) {
            case 0: {
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                break;
            }
            case 1: {
                visitedNodesInOrder = BFS(grid, startNode, finishNode);
                break;
            }
            case 2: {
                visitedNodesInOrder = DFS(grid, startNode, finishNode);
                break;
            }
            case 3: {
                visitedNodesInOrder = astar(grid, startNode, finishNode);
                break;
            }
            case 4: {
                visitedNodesInOrder = greedyBestFS(grid, startNode, finishNode);
                break;
            }
            case 5: {
                visitedNodesInOrder = biDirectional(
                    grid,
                    startNode,
                    finishNode
                );
                nodesInShortestPathOrder = this.biDirectionalHelper(
                    grid,
                    visitedNodesInOrder
                );
                break;
            }
            default:
                visitedNodesInOrder = astar(grid, startNode, finishNode);
                break;
        }

        if (algorithm !== 5) {
            nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        }

        if (visitedNodesInOrder !== false) {
            console.log(grid);
            if (algorithm === 5) {
                this.animateAlgorithm(
                    visitedNodesInOrder,
                    nodesInShortestPathOrder
                );
            } else {
                this.animateAlgorithm(
                    visitedNodesInOrder,
                    nodesInShortestPathOrder
                );
            }
        }
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <button onClick={() => this.visualizeAlgorithm(0)}>
                    Dijkstra's Algorithm
                </button>
                <button onClick={() => this.visualizeAlgorithm(1)}>
                    Breadth First Search
                </button>
                <button onClick={() => this.visualizeAlgorithm(2)}>
                    Depth First Search
                </button>
                <button onClick={() => this.visualizeAlgorithm(3)}>
                    A* Algorithm
                </button>
                <button onClick={() => this.visualizeAlgorithm(4)}>
                    Greedy Best First Search
                </button>
                <div className="grid" id="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {
                                        row,
                                        col,
                                        isFinish,
                                        isStart,
                                        isWall
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
                                            row={row}
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLUMNS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
