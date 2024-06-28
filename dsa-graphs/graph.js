class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex)
    }

  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }
  
  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {

    //create a queue to keep track of potential adjacencies
    let toVisitQueue = [];
    
        // add the vertex parameter to the queue
        toVisitQueue.push(vertex)
    
    let visited = new Set(toVisitQueue);

    //loop through the visit queue.
    while ( toVisitQueue.length > 0 ){
      //shift the tovisitQueue and set the returned value to be current.
      let current = toVisitQueue.shift();

      // loop through the current node, add adjacents to toVisitQueue.
        for(let adjacent of current.adjacent){
          if(!visited.has(adjacent)){
            toVisitQueue.push(adjacent);
            visited.add(adjacent)
          }
        }

        // if the 
        if(vertex.value === current.value){
          current.adjacent.delete(vertex)
        }
    }

    this.nodes.delete(vertex)
    return this
    }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start]; // Initialize a queue of nodes to be visited
    let visited = new Set(toVisitStack); //initialize visited Set to keep track of what has been seen.
    let result = [];

    //continue looping through visit queue as long as their is an item in it.
    while( toVisitStack.length > 0){
      let current = toVisitStack.pop(); //set current to the shifted value of the toVisitStack
      result.push(current.value)

      //loop through the adjacent nodes of the current node.)
      for(let node of current.adjacent){
        if(!visited.has(node)){
          toVisitStack.push(node); //push the node iteration into the toVisitStack
          visited.add(node);
        }
      }
    }

    return result
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start]; // Initialize a queue of nodes to be visited
    let visited = new Set(toVisitQueue); //initialize visited Set to keep track of what has been seen.
    let result = [];

    //continue looping through visit queue as long as their is an item in it.
    while( toVisitQueue.length > 0){
      let current = toVisitQueue.shift(); //set current to the shifted value of the toVisitQueue
      result.push(current.value)

      //loop through the adjacent nodes of the current node.)
      for(let node of current.adjacent){
        if(!visited.has(node)){
          toVisitQueue.push(node); //push the node iteration into the toVisitQueue
          visited.add(node);
        }
      }
    }

    return result
}
}
module.exports = {Graph, Node}