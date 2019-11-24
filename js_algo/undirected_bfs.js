g= new graph("d");
graphData=localStorage.getItem("graphData");
graphData=JSON.parse(graphData);
g.vertices=graphData.vertices;
g.edges=graphData.edges;
console.log(g);
console.log(g.getGraph());




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
      
      }
    }

  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});
// g= new graph("ud");
// g.addVertex("A",100,100);
// g.addVertex("B",200,100);
// g.addVertex("C",100,200);
// g.addVertex("D",200,200);
// g.addEdge(1,0,1);
// g.addEdge(3,1,1);
//
console.log(g);
 cy.add(g.getGraph());
//cy.getElementById("a").addClass('bre');
cy.getElementById(0).addClass('visited');
