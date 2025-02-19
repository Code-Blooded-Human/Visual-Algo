class vertex{
  id;
  name;
  children;
  x;
  y;
  color;
  visited;
  constructor(id,name,x,y){
    this.id=id;
    this.name=name;
    this.x=x;
    this.y=y;
    this.visited=false;
    this.color="blue";
    this.children= new Array();
  }
  addChildren(id){
    this.children.push(id);
  }
}

class edge{
  from;
  to;
  color;
  weight;
  constructor(from,to,weight){
    this.from=from;
    this.to=to;
    this.color="grey";
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

  addEdge(from,to,weight=1){
    this.edges.push(new edge(from,to,weight));
    this.vertices[from].addChildren(to);
    if(this.type=="u" || this.type=="uw"){
      //this.edges.push(new edge(to,from,weight));
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
      data.id="e"+""+this.edges[i].from+""+this.edges[i].to;
      data.source=this.edges[i].from;
      data.target=this.edges[i].to;
      data.weight=this.edges[i].weight;
      edge.data=data;
      graphData.push(edge);
    }
    return graphData;
  }
}
