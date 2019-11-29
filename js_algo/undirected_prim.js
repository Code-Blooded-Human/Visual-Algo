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
       'label': 'data(weight)',
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
       'label': 'data(weight)',
        'curve-style': 'bezier'

      }
    }

  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});
