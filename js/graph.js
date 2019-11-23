class vertex{
  id;
  name;
  children;
  x;
  y;
  constructor(id,name,x,y){
    this.id=id;
    this.name=name;
    this.x=x;
    this.y=y;
    this.children= new Array();
  }
  addChildren(id){
    this.children.push(id);
  }
}

class edge{
  from;
  to;
  weight;
  constructor(from,to,weight){
    this.from=from;
    this.to=to;
    this.weight=weight;
  }
}
class graph{
  type; //String: d:directed, dw: directed_weighted, u: undirected, uw: undirected_weighted;
  vertices;
  edges;
  constructor(type){
    this.type=type;
    this.vertices=new Array();
    this.edges=new Array();
  }

  addVertex(name,x,y){
    this.vertices.push(new vertex(this.vertices.length,name,x,y));
  }

  addEdge(to,from,weight=1){
    this.edges.push(new edge(to,from,weight));
    this.vertices[from].addChildren(to);
    if(this.type=="u" || this.type=="uw"){
      this.edges.push(new edge(from,to,weight));
      this.vertices[to].addChildren(from);
    }
  }

  getGraph(){
    var graphData=new Array();
    for(var i=0;i<this.vertices.length;i++){
      var node  = {};
      node.group='nodes';
      var data={};
      data.id=i;
      var position ={};
      position.x=this.vertices[i].x;
      position.y=this.vertices[i].y;
      node.data=data;
      node.position=position;
      graphData.push(node);
    }
    for(var i=0;i<this.edges.length;i++){
      var edge ={};
      edge.group="edges";
      var data={};
      data.id="e"+i;
      data.source=this.edges[i].from;
      data.target=this.edges[i].to;
      edge.data=data;
      graphData.push(edge);
    }
    return graphData;
  }
}
g= new graph("ud");
g.addVertex("A",100,100);
g.addVertex("B",200,100);
g.addVertex("C",100,200);
g.addVertex("D",200,200);
g.addEdge(1,0,1);
g.addEdge(3,1,1);
