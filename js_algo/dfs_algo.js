
// dfsStack = null;
//
// function areAllVerticesVisited(children){
//   for(i=0;i<children.length;i++){
//     if(g.vertices[children[i]].visited==false){
//       return false;
//     }
// }
// return true;
//
// }
//
// function dfs(node){
//   g.vertices[node].visited=true;
//   dfsStack.push(node);
//   cy.getElementById(node).addClass('visited');
// }
//
//
//  function dfs_next(){
//
//   if(dfsStack.isEmpty()){
//     return true;
//   }else{
//   var n = dfsStack.peek();
//   if(g.vertices[n].children.length==0 || areAllVerticesVisited(g.vertices[n].children)){
//     dfsStack.pop();
//     cy.getElementById(n).addClass('done');
//     console.log("POP-->"+n);
//   }else{
//
//       for(var i=0; i< g.vertices[n].children.length;i++){
//
//         if(!g.vertices[g.vertices[n].children[i]].visited){
//
//           dfsStack.push(g.vertices[n].children[i]);
//           g.vertices[g.vertices[n].children[i]].visited=true;
//           cy.getElementById(g.vertices[n].children[i]).addClass('visited');
//           cy.getElementById("e"+""+n+""+g.vertices[n].children[i]).addClass("edgeVisited");
//           cy.getElementById("e"+""+g.vertices[n].children[i]+""+n).addClass("edgeVisited");
//           break;
//         }
//     }
//   }
// return false;
// }
// }
//
// var start = function(){
//   if(dfs_next()==true){
//
//   }else{
//     setTimeout(start,1000);
//   }
// }
function dfs_handler(start_vertex){
  setTimeout(dfs_r,1000,start_vertex);
}
dfs_time=1;
function dfs_r(node_id){
  g.vertices[node_id].visited=true;
  setTimeout(colorDfsVertex,dfs_time*1000,node_id,"visited");
  dfs_time++;
  g.vertices[node_id].children.forEach(child=>{
    if(g.vertices[child].visited){
      setTimeout(colorDfsEdge,dfs_time*1000,node_id,child,"blocked");
      dfs_time++;
    }else{
      setTimeout(colorDfsEdge,dfs_time*1000,node_id,child,"edgeVisited");
      dfs_time++;
      dfs_r(child);
    }
  });
  setTimeout(colorDfsVertex,dfs_time*1000,node_id,"done");
  dfs_time++;
}

function colorDfsEdge(source,target,edge_class){
  console.log("colorEdge");
  if(graph.type=="u"||graph.type=="uw"){
    cy.getElementById("e"+source+""+target).addClass(edge_class);
    cy.getElementById("e"+target+""+source).addClass(edge_class);
  }else{
    console.log("e"+source+""+target);
    cy.getElementById("e"+source+""+target).addClass(edge_class);
  }
}
function colorDfsVertex(vertex_id,vertex_class){
  cy.getElementById(vertex_id).addClass(vertex_class);;
}
