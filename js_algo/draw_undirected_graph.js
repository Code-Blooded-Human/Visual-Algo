


var cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: [],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        // 'background-color': 'red',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 1,
       'line-color': 'red',
        'curve-style': 'bezier',

      }
    },
    {
      selector: '.visited',
      style: {
        'background-color': 'blue',
        'label': 'data(id)'
      }
    },
    {
      selector: '.done',
      style: {
        'background-color': 'yellow',
        'label': 'data(id)'
      }
    },
    {
      selector: '.edgeVisited',
      style: {
        'width': 1,
       'line-color': 'blue',
        'curve-style': 'bezier',
        'target-arrow-color': 'blue',
        'target-arrow-shape': 'triangle'
      }
    }

  ],

  layout: {
    name: 'grid',
    rows: 1
  },
  panningEnabled: false,
userPanningEnabled: false,

});
g = new graph("u");

function addVertex(x,y){
 var node={};
 node.group="nodes";
 var data={};
 data.id=g.vertices.length;
 var position={};
 position.x=x;
 position.y=y;
 node.data=data;
 node.position=position;
 cy.add(node);
 g.addVertex("name",x,y);
}


function addEdge(s,t){
  g.addEdge(s,t);
  var edge={};
  edge.group="edges";
  var data={};
  data.id="e"+s+","+t;
  data.source=s;
  data.target=t;
  edge.data=data;
  cy.add(edge);
}

var child = null;
var parent = null;

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  if(child==null){
    console.log("child=>"+node.id());
    child = node.id();
  }else{
    parent = node.id();
    console.log("parent=>"+parent);
    addEdge(child,parent);
    child=null;
    parent=null;
  }
});


$("#cy").dblclick(function(e){
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    addVertex(x,y);
});


function save(){
  var graphData = JSON.stringify(g);
  localStorage.setItem("graphData",graphData);
  console.log("Graph Data Saved successfully");
}
