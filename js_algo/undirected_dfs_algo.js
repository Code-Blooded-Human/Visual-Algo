
var dfsStack = new stack();

function areAllVerticesVisited(children){
  for(i=0;i<children.length;i++){
    if(g.vertices[children[i]].visited==false){
      return false;
    }
}
return true;

}

function dfs(node){
  g.vertices[node].visited=true;
  dfsStack.push(node);
  cy.getElementById(node).addClass('visited');
}


 function dfs_next(){

  if(dfsStack.isEmpty()){
    return true;
  }else{
  var n = dfsStack.peek();
  if(g.vertices[n].children.length==0 || areAllVerticesVisited(g.vertices[n].children)){
    dfsStack.pop();
    cy.getElementById(n).addClass('done');
    console.log("POP-->"+n);
  }else{

      for(var i=0; i< g.vertices[n].children.length;i++){

        if(!g.vertices[g.vertices[n].children[i]].visited){

          dfsStack.push(g.vertices[n].children[i]);
          g.vertices[g.vertices[n].children[i]].visited=true;
          cy.getElementById(g.vertices[n].children[i]).addClass('visited');
          cy.getElementById("e"+""+n+""+g.vertices[n].children[i]).addClass("edgeVisited");
            cy.getElementById("e"+""+g.vertices[n].children[i]+""+n).addClass("edgeVisited");
          break;
        }
    }
  }
return false;
}
}

var start = function(){
  if(dfs_next()==true){

  }else{
    setTimeout(start,1000);
  }
}

dfs(0);
