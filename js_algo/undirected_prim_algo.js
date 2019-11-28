g = new graph("uw");
g.addVertex("A",100,100);
g.addVertex("B",200,100);
g.addVertex("C",100,200);
g.addVertex("D",200,200);
g.addVertex("E",300,300);
g.addEdge(0,1,5);
g.addEdge(0,2,3);
g.addEdge(2,1,4);
g.addEdge(2,4,8);
g.addEdge(3,1,6);
g.addEdge(3,4,2);




function prim(){
  var s = g.vertices[0];
  var mst = new graph();;
  var explored = new Set();
  var edgeQueue = new PriorityQueue();


  while(explored.size != g.vertices.length){

  console.log("ADDING "+s.id);
  if(explored.has(s)){
    break;
  }
  explored.add(s);
  mst.vertices.push(s);


  g.edges.forEach(edge => { if(edge.to == s.id || edge.from == s.id){
    console.log("ENQUEUE - >");
    console.log(edge);
    edgeQueue.enqueue(edge,edge.weight);}});
  // ^^ add egdes from s to priorityQueue
  var minEdge = null;


  while(!edgeQueue.isEmpty()){

    minEdge = edgeQueue.dequeue();
    minEdge=minEdge.element;
    console.log("DEQUEUE");
    console.log(minEdge);
    console.log(s.id);
    if(minEdge.to==s.id){
      console.log("inside")
      if(!explored.has(g.vertices[minEdge.from])){
        //mst.vertices.push(g.vertices[minEdge.from]);
        s=g.vertices[minEdge.from];
        mst.edges.push(minEdge);

        break;
      }
    }else if(minEdge.from==s.id){
      if(!explored.has(g.vertices[minEdge.to])){
        //mst.vertices.push(g.vertices[minEdge.to]);
        s=g.vertices[minEdge.to];
        mst.edges.push(minEdge);

        break;
      }
    }else{
      //This is a case where vertex is in cut but not selected.
      if(!explored.has(g.vertices[minEdge.to])){
        s=g.vertices[minEdge.to];
        mst.edges.push(minEdge);
        break;
      }else if(!explored.has(g.vertices[minEdge.from])){
        s=g.vertices[minEdge.from];
        mst.edges.push(minEdge);
        break;
      }else{
        console.log("HEY RAAM, Yeh toh cut mei hai");
      }
    }
  }


}
return mst;
}
