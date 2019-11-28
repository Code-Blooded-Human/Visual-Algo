g=null;
gbackup=null;
cy=null;
state=null;
child=null;
parent=null;
function default_graph(){
  dg='{"type":"dw","vertices":[{"id":0,"name":"name","children":["1","2","4"],"x":358,"y":78,"color":"blue","visited":false},{"id":1,"name":"name","children":["5"],"x":94,"y":214,"color":"blue","visited":false},{"id":2,"name":"name","children":[],"x":290,"y":204,"color":"blue","visited":false},{"id":3,"name":"name","children":["0","8"],"x":490,"y":209,"color":"blue","visited":false},{"id":4,"name":"name","children":[],"x":679,"y":207,"color":"blue","visited":false},{"id":5,"name":"name","children":["6"],"x":128,"y":351,"color":"blue","visited":false},{"id":6,"name":"name","children":["3"],"x":316,"y":341,"color":"blue","visited":false},{"id":7,"name":"name","children":["8"],"x":506,"y":353,"color":"blue","visited":false},{"id":8,"name":"name","children":[],"x":635,"y":341,"color":"blue","visited":false}],"edges":[{"from":"0","to":"1","color":"grey","weight":1},{"from":"0","to":"2","color":"grey","weight":1},{"from":"3","to":"0","color":"grey","weight":1},{"from":"0","to":"4","color":"grey","weight":1},{"from":"1","to":"5","color":"grey","weight":1},{"from":"5","to":"6","color":"grey","weight":1},{"from":"3","to":"8","color":"grey","weight":1},{"from":"6","to":"3","color":"grey","weight":1},{"from":"7","to":"8","color":"grey","weight":1}]}';
  dg=JSON.parse(dg);
  g=new graph();
  g.vertices=dg.vertices;
  g.edges=dg.edges;
  g.type=dg.type;
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


default_graph();
