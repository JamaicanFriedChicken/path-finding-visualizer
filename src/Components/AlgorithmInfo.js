export function displayAlgorithmInfo(info) {
    switch (info) {
        case 0: {
            return `<p style="text-align: center;"><strong>Dijkstra's Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Dijkstra's algorithm guarantees the shortest path. It is a greedy algorithm that explores unvisited nodes that have the smallest distance from the starting node. The distance/edge weight from one neighbouring node to another is 1. A limitation of Dijkstra's algorithm is that the edge weights have to have a non-negative value.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -83px" src="https://i.imgur.com/ILm2p0V.png" alt="" width="1370" height="1417" /></p>
        `;
        }

        case 1: {
            return `<p style="text-align: center;"><strong>Breadth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">The Breadth-First Search algorithm guarantees the shortest path. It explores all nodes by layers, or in other words, exploring all the neighbouring nodes at a certain level before moving to the next-level neighbour nodes.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;<br /><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -85px" src="https://i.imgur.com/ZkmUeoU.png" alt="" width="1070" height="1190" /></p>
        `;
        }

        case 2: {
            return `<p style="text-align: center;"><strong>Depth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">The Depth-First Search algorithm does not guarantee the shortest path. Depth-First search traverses a maze as deep as far as possible and then comes back to a node to repeat the whole process of going as deep as possible again.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><br /><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -137px" src="https://i.imgur.com/eGSub6I.png" alt="" width="1090" height="1250" /></p>
        `;
        }
        case 3: {
            return `<p style="text-align: center;"><strong>A* Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p line-height = "1.2em" style="text-align: left; padding-left: 30px;">The A* algorithm guarantees the shortest path. The algorithm is similar to Dijkstra's algorithm and Breadth-First Search, but A* differs by using heuristics to essentially plan ahead at each step so a more optimal decision is made. The algorithm uses a function f(n) = g(n) + h(n), where f(n) is the total estimated cost of the path through node n, which we will be using to compare and order nodes in the priority queue. g(n) is the exact cost from the start node to n. h(n) is the heuristic part, it is the estimated cost from n to the finish node. Calculating h(n) can be done using Manhattan, Euclidean, or Diagonal distance. We will be using the Manhattan distance. One neat fact about A* is that if h(n) = 0, A* becomes Dijkstra's algorithms.&nbsp;&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -97px" src="https://i.imgur.com/J1xk90R.png" alt="" width="1200" height="1470" /><br /><br /></p>
        `;
        }
        case 4: {
            return `<p style="text-align: center;"><strong>Greedy Best-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Greedy Best-First Search Algorithm does not guarantee the shortest path. It is similar to A*, but the only difference is that f(n) = h(n), so the algorithm evaluates nodes by using only the heuristic function as a guide towards the finish node.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -95px" src="https://i.imgur.com/H2k10Nc.png" alt="" width="1080" height="1624" /><br /><br /></p>
        `;
        }
        case 5: {
            return `<p style="text-align: center;"><strong>Bidirectional Breadth-First Search Algorithm</strong></p>
        <p style="text-align: left;"><span style="text-decoration: underline;">How it works</span>:</p>
        <p style="text-align: left; padding-left: 30px;">Bidirectional Breadth-First Search Algorithm guarantees the shortest path. It performs Breadth-First Search on both the start and finish nodes and terminates when the two searches intersect with one another.&nbsp;</p>
        <p style="text-align: left;"><span style="text-decoration: underline;">Implementation</span>:&nbsp;</p>
        <p style="text-align: left;"><img style="display: block; margin-left: auto; margin-right: auto; margin-top: -90px" src="https://i.imgur.com/buofADW.png" width="1080" height="1700" /><br /><br /></p>`;
        }
        default: {
            return `<p>Sorry, an unexpected error occured, please refresh</p>`;
        }
    }
}
