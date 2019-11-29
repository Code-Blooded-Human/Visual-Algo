// g

bfsQueue=new queue;


function start_bfs(node){
    bfsQueue.enqueue(node);
    g.vertices[node].visited=true;
    cy.getElementById(node).addClass("visited");

}


function step_bfs(){
  //console.log(bfsQueue.print());
  if(bfsQueue.isEmpty()){
    return false;
  }
  node = bfsQueue.dequeue();
  g.vertices[node].visited=true;
  for(var i=0;i<g.vertices[node].children.length;i++){
    if(g.vertices[g.vertices[node].children[i]].visited){

    }else{
      g.vertices[g.vertices[node].children[i]].visited=true;
      cy.getElementById("e"+node+""+g.vertices[node].children[i]).addClass("edgeVisited");
        cy.getElementById("e"+g.vertices[node].children[i]+""+node).addClass("edgeVisited");
      cy.getElementById(g.vertices[node].children[i]).addClass("visited");
      bfsQueue.enqueue(g.vertices[node].children[i]);
    }
  }
  return true;
}


var step =function(){
  console.log("STEP");
  if(step_bfs()){
    setTimeout(step,1000);
  }
}
