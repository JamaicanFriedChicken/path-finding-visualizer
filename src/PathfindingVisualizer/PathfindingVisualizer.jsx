import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { BFS } from "../algorithms/bfs";
import { DFS } from "../algorithms/dfs";
import { greedyBestFS } from "../algorithms/greedybestfs";
import { biDirectional } from "../algorithms/BiDirectional";
import { simpleMaze } from "../Maze/SimpleMaze";
import { displayAlgorithmInfo } from "../algorithms/AlgorithmInfo";

import "./PathfindingVisualizer.css";

export const NUM_COLUMNS = 50;
export const NUM_ROWS = 20;
var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;
var mouseIsPressed = false;
var startIsPressed = false;
var finishIsPressed = false;
var isRunning = false;
var slideNumber = 0;

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
        if (
            nodesInShortestPathOrder == null ||
            nodesInShortestPathOrder.length <= 1
        ) {
            document.getElementById(
                `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
            ).className = "node node-visited-invalid-finish";
            isRunning = false;
            return;
        }

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (typeof node === "undefined") {
                    isRunning = false;
                    return;
                }
                if (node.isFinish) {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = "node node-visited-finish";
                } else if (node.isStart) {
                    document.getElementById(
                        `node-${START_NODE_ROW}-${START_NODE_COL}`
                    ).className = "node node-visited-start";
                } else {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = "node node-shortest-path";
                }
                if (i === nodesInShortestPathOrder.length - 1) {
                    isRunning = false;
                }
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
                <div className="title-container">
                    <div className="title" onClick={() => this.refreshPage()}>
                        Pathfinding Visualizer
                    </div>

                    <div className="title-button-row">
                        <button onClick={() => this.visualizeWalls(1)}>
                            {" "}
                            Recursive Division{" "}
                        </button>
                        <button onClick={() => this.visualizeWalls(0)}>
                            {" "}
                            Scatter{" "}
                        </button>
                        <button onClick={() => this.visualizeWalls(2)}>
                            {" "}
                            Vertical Maze{" "}
                        </button>
                        <button onClick={() => this.visualizeWalls(3)}>
                            {" "}
                            Horizontal Maze{" "}
                        </button>
                        {/* <button onClick={() => this.generateMaze()}> Generate Maze</button> */}
                    </div>
                    <button
                        id="info-button"
                        className="info-button"
                        onClick={() => this.openHelpMenu()}
                    >
                        {" "}
                        ?{" "}
                    </button>
                </div>

                <div id="helpMenu" className="modal">
                    <div className="modal-container">
                        <span id="close" className="close">
                            &times;
                        </span>
                        <div className="buttons-container">
                            <div className="info-buttons">
                                <button
                                    id="Prev"
                                    onClick={() => this.changeText(-1)}
                                >
                                    {" "}
                                    Prev{" "}
                                </button>
                                <button
                                    id="Next"
                                    onClick={() => this.changeText(1)}
                                >
                                    {" "}
                                    Next{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="helpMenu-content" className="modal-content"></div>
                </div>

                <div id="algo-modal" className="algo-modal">
                    <span id="algo-close" className="algo-close">
                        &times;
                    </span>
                    <div
                        id="algo-modal-content"
                        className="algo-modal-content"
                    ></div>
                </div>

                <div className="container">
                    <div className="algo-btn-group">
                        <button onClick={() => this.openAlgorithmMenu(0)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(1)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(2)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(3)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(4)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(5)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                        <button onClick={() => this.openAlgorithmMenu(6)}>
                            {" "}
                            &#9432;{" "}
                        </button>
                    </div>
                    <div className="btn-group">
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
                        <button onClick={() => this.visualizeWalls(0)}>
                            Simple Maze
                        </button>
                    </div>

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
                                                    this.handleMouseDown(
                                                        row,
                                                        col
                                                    )
                                                }
                                                onMouseEnter={(row, col) =>
                                                    this.handleMouseEnter(
                                                        row,
                                                        col
                                                    )
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
                </div>
            </>
        );
    }

    visualizeWalls(maze) {
        this.clearGrid();
        if (isRunning) return;
        isRunning = true;

        const grid = clearGridHelper();
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        var turnNodesToWalls = null;
        switch (maze) {
            case 0: {
                turnNodesToWalls = simpleMaze(grid, startNode, finishNode);
                console.log(turnNodesToWalls);
                break;
            }
        }
        if (turnNodesToWalls != null) {
            this.animateWalls(turnNodesToWalls, grid);
        }
    }

    animateWalls(turnNodesToWalls, grid) {
        for (let i = 0; i <= turnNodesToWalls.length; i++) {
            setTimeout(() => {
                const node = turnNodesToWalls[i];
                if (typeof node !== "undefined") {
                    if (!node.isStart && !node.isFinish && node.isWall) {
                        document.getElementById(
                            `node-${node.row}-${node.col}`
                        ).className = "node node-wall";
                    }
                }

                if (i === turnNodesToWalls.length - 1) {
                    isRunning = false;
                    this.setState({ grid: grid });
                }
            }, 10 * i);
        }
    }

    clearGrid() {
        if (isRunning) return;
        const newgrid = clearGridHelper();
        this.setState({ grid: newgrid });
        return newgrid;
    }

    clearPath(grid) {
        if (isRunning) return;
        const newgrid = clearGridHelperKeepWalls(grid);
        this.setState({ grid: newgrid });
        return newgrid;
    }

    refreshPage() {
        window.location.reload();
    }

    openHelpMenu() {
        //make new jsx and css page for the helper menu
        // make sure background is not interactable when help menu is open
        // put X button to close
        // describe algorithms, link github repo site, add tutorial how to use, add inspiraton for the application
        // Get the modal
        var modal = document.getElementById("helpMenu");
        modal.style.display = "block";

        // Get the button that opens the modal
        var btn = document.getElementById("info-button");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        console.log(modal, btn, span);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
        this.changeText(1);
    }

    changeText(next) {
        const MAXSLIDE = 5;
        const MINSLIDE = 1;

        if (next === 1) {
            if (slideNumber === MAXSLIDE) {
                slideNumber = MAXSLIDE;
            } else {
                slideNumber += next;
            }
        } else {
            if (slideNumber === MINSLIDE) {
                slideNumber = MINSLIDE;
            } else {
                slideNumber += next;
            }
        }
        switch (slideNumber) {
            case 1: {
                document.getElementById("helpMenu-content").innerHTML =
                    this.HTMLHelper(MAXSLIDE) +
                    `
            <h2 style= "margin-top: -0.3em;"> Welcome to the Pathfinding Visualizer </h2> 
            <h3 style= "margin-top: -0.7em;"> Made by Michael Lue</h3>
            <p> This path finding application involves multiple path finding algorithms from the most famous ones i.e. Dijkstra's to a somewhat basic algorithm such as Breadth First Search. 
            Pathfinding algorithms normally compute the shortest path to take from one point to another. It is a fundamental component used in a myriad of applications e.g. Google maps, line following robots and much more. 
            You are also able to generate mazes to test the different algorithms. 
            Note: For the shortest guaranteed path, use A*.</p>
            <p> Click on <strong>Next</strong> to continue the tutorial. Otherwise click anywhere outside the box, or the <strong>X</strong> button to play around with our application</p>
            <p><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -2.8em;" src="https://i.ibb.co/P9fVVW8/slide0-png.png" alt="" width="225" height="235" /></p>`;
                break;
            }

            case 2: {
                document.getElementById("helpMenu-content").innerHTML =
                    this.HTMLHelper(MAXSLIDE) +
                    `<h2 style= "margin-top: -0.3em;">Inspiration</h2>
            <p> The motivation for this project all started , 
             with only the fundamentals of Computer Science to a minimum extent, I had to dig deeper to understand much more.
             What better way to learn than to build and create something captivating and visual. I hope this application 
             allows you to understand how each algorithm works.</p>
            <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://image.flaticon.com/icons/png/512/584/584641.png" alt="" width="129" height="129" /></p>`;
                break;
            }

            case 3: {
                document.getElementById("helpMenu-content").innerHTML =
                    this.HTMLHelper(MAXSLIDE) +
                    `<h2 style= "margin-top: -0.3em;"> How to Start? </h2>
            <p style = "line-height: 1.15em;"> Simply left-click your mouse and hover anywhere on the grid to generate walls. 
                To auto-generate mazes you have a few selections of which type of mazes you'd like.Proceed to click any of the algorithms 
                afterwards then magically observe the characteristics of each pathfinding algorithm. You can drag the start and
                finish node to any place you desire on the grid. You can clear the grid or clear the path of each algorithm after observing. </p>
                
            <table style="height: 108px; width: 190; margin-left: auto; margin-right: auto;">
            <tbody>
            <tr style="height: 33.8px;">
            <td style="width: 65px; height: 33.8px; text-align: center;"><img src="https://icons-for-free.com/iconfiles/png/512/double+arrow+doublechevronright+right+arrows+icon-1320185729292506033.png" alt="" width="27" height="27" /></td>
            <td style="width: 116px; height: 33.8px; text-align: left;">= startNode</td>
            </tr>
            <tr style="height: 17px;">
            <td style="width: 65px; height: 17px; text-align: center;"><img src="https://i.pinimg.com/originals/ba/3f/f2/ba3ff2209d0c43655116b31f8e2bbd65.png" alt="" width="27" height="27" /></td>
            <td style="width: 116px; height: 17px; text-align: left;">= finishNode</td>
            </tr>
            </tbody>
            </table>
            <p>&nbsp;</p>
            `;
                break;
            }

            case 4: {
                document.getElementById("helpMenu-content").innerHTML =
                    this.HTMLHelper(MAXSLIDE) +
                    `<h2 style= "margin-top: -0.3em;"> Algorithm Information </h2>
              <table>
              <tbody>
              <tr>
              <td><img src="https://i.imgur.com/fnhxgNj.jpg" alt="" width="59" height="60" /></td>
              <td>
              <p style="text-align: left; padding-left: 10px">Click on this icon beside any pathfinding algorithm to view details about&nbsp;how to use the algorithm, the time complexity, and detailed commented code about how the algorithm works. Feel free to go to our Github repository on the next page to see more implementation details</p>
              </td>
              </tr>
              </tbody>
              </table>
            `;
                break;
            }

            case 5: {
                document.getElementById("helpMenu-content").innerHTML =
                    this.HTMLHelper(MAXSLIDE) +
                    `<h2 style= "margin-top: -0.3em;">Before You Start</h2>
              <p> I hope you'll have fun fiddling with this application, for further questions or feedback, please do not hesitate to contact me.
              The code can be found on my Github repository at <a href = "https://github.com/JamaicanFriedChicken/path-finding-visualizer" target="_blank">path-finding-visualizer</a> </p>          
              <p>*Note: if your screen is small and the proportions of the maze seem wrong, use CTRL – to zoom out</p>
              <table style="height: 227px; margin-left: auto; margin-right: auto; width: 552px;">
              <tbody>
              <tr>
              <td style="width: 199px;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://image.flaticon.com/icons/png/512/87/87090.png" alt="" width="152" height="152" /></td>
              </tr>
              </tbody>
              </table>
            `;
                break;
            }

            default:
                break;
        }

        var prevBtn = document.getElementById("Prev");
        var nextBtn = document.getElementById("Next");
        if (slideNumber === MINSLIDE) {
            prevBtn.style.backgroundColor = "lightgrey";
            prevBtn.disabled = true;
        } else if (slideNumber === MAXSLIDE) {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = "lightgrey";
        } else {
            console.log("reached here");
            prevBtn.disabled = false;
            prevBtn.style.backgroundColor = "hsl(214, 100%, 70%)";
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = "hsl(214, 100%, 70%)";
        }
    }

    HTMLHelper(MAXSLIDE) {
        return (
            `<p> ` +
            slideNumber +
            `/` +
            MAXSLIDE +
            `<p>
      `
        );
    }

    openAlgorithmMenu(info) {
        var modal = document.getElementById("algo-modal");
        modal.style.display = "block";

        var modalContent = document.getElementById("algo-modal-content");
        modalContent.scrollTop = 0;

        // // Get the button that opens the modal
        // var btn = document.getElementById("info-button");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("algo-close")[0];

        //console.log(modal, btn, span);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
        document.getElementById(
            "algo-modal-content"
        ).innerHTML = displayAlgorithmInfo(info);
    }
}

function getInitialGrid() {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLUMNS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(col, row) {
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
}

function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

function clearGridHelper() {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];

        for (let col = 0; col < NUM_COLUMNS; col++) {
            var node = createNode(col, row);
            node.isWall = false;

            if (!node.isFinish && !node.isStart) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node";
            } else if (node.isFinish) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-finish";
            } else if (node.isStart) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-start";
            }

            currentRow.push(node);
        }
        grid.push(currentRow);
    }
    return grid;
}

function clearGridHelperKeepWalls(oldGrid) {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];

        for (let col = 0; col < NUM_COLUMNS; col++) {
            var node = createNode(col, row);

            if (oldGrid[row][col].isWall) node.isWall = true;

            if (node.isWall) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-wall";
            } else if (!node.isFinish && !node.isStart) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node";
            } else if (node.isFinish) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-finish";
            } else if (node.isStart) {
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-start";
            }

            currentRow.push(node);
        }
        grid.push(currentRow);
    }
    return grid;
}
