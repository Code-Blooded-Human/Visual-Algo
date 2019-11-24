g= new graph("d");
g.addVertex("A",100,100);
g.addVertex("B",200,100);
g.addVertex("C",100,200);
g.addVertex("D",200,200);
g.addEdge(0,1,1); //from,to
g.addEdge(0,3,1);
g.addEdge(1,2,1);
g.addEdge(2,1,1);

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
