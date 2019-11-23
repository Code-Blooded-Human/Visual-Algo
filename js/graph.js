class vertex{
  id;
  name;
  children;
  constructor(id,name){
    this.id=id;
    this.name=name;
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

  addVertex(name){
    this.vertices.push(new vertex(this.vertices.length,name));
  }

  addEdge(to,from,weight=1){
    this.edges.push(new edge(to,from,weight));
    this.vertices[from].addChildren(to);
    if(this.type=="u" || this.type=="uw"){
      this.edges.push(new edge(from,to,weight));
      this.vertices[to].addChildren(from);
    }
  }
}
