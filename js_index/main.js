g=null;
gbackup=null;
cy=null;
state=null;
child=null;
parent=null;
function default_graph(){
  g= new graph("d");
  g.addVertex("A",100,100);
  g.addVertex("B",200,100);
  g.addVertex("C",100,200);
  g.addVertex("D",200,200);
  g.addEdge(0,1,1); //from,to
  g.addEdge(0,3,1);
  g.addEdge(1,2,1);
  g.addEdge(2,1,1);
  cy = cytoscape({

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
          'width': 3,
         'line-color': '#9e9e9e',
          'curve-style': 'bezier',
          'target-arrow-color': 'blue',
          'target-arrow-shape': 'triangle'
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
    }

  });
  cy.add(g.getGraph());
}

function clear(){
  child=null;
  parent=null;
  if(cy!=null){
    cy.destroy();
  }
}
function reset(){
  g=new graph(gbackup.type);
  g.vertices=gbackup.vertices;
  g.edges=gbackup.edges;
  clear();

} //TODO: Make a reset function
//Drawing handler functions
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

function draw_directed_graph(){
  clear();
  g=null;
  state="draw_directed_graph";
  cy = cytoscape({

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
          'width': 3,
         'line-color': '#757575',
          'curve-style': 'bezier',
          'target-arrow-color': 'black',
          'target-arrow-shape': 'triangle'
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
  g = new graph("dw");
  child = null;
  parent = null;
  cy.on('tap', 'node', function(evt){
    if(state=="draw_directed_graph"){
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
    }
  });

}
function draw_undirected_graph(){
  clear();
  g=null;
  g = new graph("u");
  state="draw_undirected_graph";
  cy = cytoscape({

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
          'width': 3,
         'line-color': '#757575',
          'curve-style': 'bezier',

        }
      },
      {
        selector: '.visited',
        style: {
          'background-color': '#14A76C',
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



  cy.on('tap', 'node', function(evt){
    if(state=="draw_undirected_graph"){
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
  }
  });
}

$("#cy").dblclick(function(e){
    if(state=="draw_directed_graph" || state=="draw_undirected_graph" ){
      var offset = $(this).offset();
      var x = (e.pageX - offset.left);
      var y = (e.pageY - offset.top);
      // var x = e.pageX - this.offsetLeft;
      // var y = e.pageY - this.offsetTop;
      console.log(x,y);
      addVertex(x,y);
    }
});
function runDFS(){

  if(g==null){
    console.log("No graph");
    return 0;
  }
  if(g.vertices.length==0){
    console.log("Empty Graph");
    return 0;
  }
  if(g.type=="u" || g.type=="uw"){
    clear();
    cy = cytoscape({

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
            'width': 3,
           'line-color': '#757575',
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
            'width': 3,
           'line-color': 'green',
            'curve-style': 'bezier'

          }
        }

      ],

      layout: {
        name: 'grid',
        rows: 1
      }

    });

    cy.add(g.getGraph());
    cy.getElementById(0).addClass('visited');

  }else if(g.type=="d" || g.type=="dw"){
    clear();
    cy = cytoscape({

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
            'target-arrow-color': 'blue',
            'target-arrow-shape': 'triangle'
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
      }

    });

     cy.add(g.getGraph());

    cy.getElementById(0).addClass('visited');
  }
  dfsStack= new stack();
  dfs(0);
  start();

}
function runBFS(){
  if(g==null){
    console.log("No graph");
    return 0;
  }
  if(g.vertices.length==0){
    console.log("Empty Graph");
    return 0;
  }
  if(g.type=="u" || g.type=="uw"){
    clear();
    cy = cytoscape({

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
            'width': 3,
           'line-color': '#757575',
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
            'width': 3,
           'line-color': 'green',
            'curve-style': 'bezier'

          }
        }

      ],

      layout: {
        name: 'grid',
        rows: 1
      }

    });

    cy.add(g.getGraph());
    cy.getElementById(0).addClass('visited');

  }else if(g.type=="d" || g.type=="dw"){
    clear();
    cy = cytoscape({

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
            'target-arrow-color': 'blue',
            'target-arrow-shape': 'triangle'
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
      }

    });

     cy.add(g.getGraph());

    cy.getElementById(0).addClass('visited');
  }
  start_bfs(0);
  step();
}
function select_start_vertex(){

}
