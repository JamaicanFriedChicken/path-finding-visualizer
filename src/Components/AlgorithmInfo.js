export function displayAlgorithmInfo(info) {
    switch (info) {
        case 0: {
            return `<p style="text-align: center;"><strong>Dijkstra's Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Dijkstra's algorithm guarantees the shortest path. It is a greedy algorithm that explores unvisited nodes that have the smallest distance from the starting node. The distance/edge weight from one neighbouring node to another is 1. A limitation of Dijkstra's algorithm is that the edge weights have to have a non-negative value.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>: using a priority queue</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/huM31J2.png" alt="" width="740" height="1217" /></p>
        `;
        }

        case 1: {
            return `<p style="text-align: center;"><strong>Breadth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">The Breadth-First Search algorithm guarantees the shortest path. It explores all nodes by layers, or in other words, exploring all the neighbouring nodes at a certain level before moving to the next-level neighbour nodes.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;<br /><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/85NSd1y.png" alt="" width="767" height="1096" /></p>
        `;
        }

        case 2: {
            return `<p style="text-align: center;"><strong>Depth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">The Depth-First Search algorithm does not guarantee the shortest path. Depth-First search traverses a maze as deep as far as possible and then comes back to a node to repeat the whole process of going as deep as possible again.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><br /><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/9XT7dsJ.png" alt="" width="800" height="1280" /></p>
        `;
        }
        case 3: {
            return `<p style="text-align: center;"><strong>A* Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p line-height = "1.2em" style="text-align: left; padding-left: 30px;">The A* algorithm guarantees the shortest path. The algorithm is similar to Dijkstra's algorithm and Breadth-First Search, but A* differs by using heuristics to essentially plan ahead at each step so a more optimal decision is made. The algorithm uses a function f(n) = g(n) + h(n), where f(n) is the total estimated cost of the path through node n, which we will be using to compare and order nodes in the priority queue. g(n) is the exact cost from the start node to n. h(n) is the heuristic part, it is the estimated cost from n to the finish node. Calculating h(n) can be done using Manhattan, Euclidean, or Diagonal distance. We will be using the Manhattan distance. One neat fact about A* is that if h(n) = 0, A* becomes Dijkstra's algorithms.&nbsp;&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/p3LvPbF.png" alt="" width="750" height="1670" /><br /><br /></p>
        `;
        }
        case 4: {
            return `<p style="text-align: center;"><strong>Greedy Best-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Greedy Best-First Search Algorithm does not guarantee the shortest path. It is similar to A*, but the only difference is that f(n) = h(n), so the algorithm evaluates nodes by using only the heuristic function as a guide towards the finish node.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/0WsX4MR.png" alt="" width="764" height="1624" /><br /><br /></p>
        `;
        }
        case 5: {
            return `<p style="text-align: center;"><strong>Bidirectional Breadth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Bidirectional Breadth-First Search Algorithm guarantees the shortest path. It performs Breadth-First Search on both the start and finish nodes and terminates when the two searches intersect with one another.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/yPXxd30.png" width="763" height="1378" /><br /><br /></p>`;
        }
        default: {
            return `<p>Sorry, an unexpected error occured, please refresh</p>`;
        }
    }
}
