
timer = 1;


function prim(id){
  console.log("Starting prims");
  console.log(g);

  var s = g.vertices[id];
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
    edgeQueue.print();
    edgeQueue.enqueue(edge,edge.weight);}});
  // ^^ add egdes from s to priorityQueue
  var minEdge = null;


  while(!edgeQueue.isEmpty()){

    minEdge = edgeQueue.dequeue();
    minEdge=minEdge.element;
    edgeQueue.print();
    console.log("DEQUEUE");
    console.log(minEdge);
    console.log(s.id);
    if(minEdge.to==s.id){
      console.log("inside")
      if(!explored.has(g.vertices[minEdge.from])){
        //mst.vertices.push(g.vertices[minEdge.from]);
        s=g.vertices[minEdge.from];
        mst.edges.push(minEdge);
        setTimeout(colorEdge,timer*1000,minEdge);
        timer=timer+2;
        setTimeout(colorVertex,timer*1000,s.id);
        timer=timer+2;
        break;
      }
    }else if(minEdge.from==s.id){
      if(!explored.has(g.vertices[minEdge.to])){
        //mst.vertices.push(g.vertices[minEdge.to]);
        s=g.vertices[minEdge.to];
        mst.edges.push(minEdge);
        setTimeout(colorEdge,timer*1000,minEdge);
        timer=timer+2;
        setTimeout(colorVertex,timer*1000,s.id);
        timer=timer+2;
        break;
      }
    }else{
      //This is a case where vertex is in cut but not selected.
      if(!explored.has(g.vertices[minEdge.to])){
        s=g.vertices[minEdge.to];
        mst.edges.push(minEdge);
        setTimeout(colorEdge,timer*1000,minEdge);
        timer=timer+2;
        setTimeout(colorVertex,timer*1000,s.id);
        timer=timer+2;
        break;
      }else if(!explored.has(g.vertices[minEdge.from])){
        s=g.vertices[minEdge.from];
        mst.edges.push(minEdge);
        setTimeout(colorEdge,timer*1000,minEdge);
        timer=timer+2;
        setTimeout(colorVertex,timer*1000,s.id);
        timer=timer+2;
        break;
      }else{
        console.log("CUT EDGE");
      }
    }
  }


}
return mst;
}

function colorEdge(edge){
  console.log(edge);
  cy.getElementById("e"+edge.to+""+edge.from).addClass('edgeVisited');
  cy.getElementById("e"+edge.from+""+edge.to).addClass('edgeVisited');
}
function colorVertex(vertex_id){
  console.log(vertex_id);
  cy.getElementById(vertex_id).addClass('visited');
}
