const treeScheme = {
  id: 'tree-1',
  name: 'app',
  items: [
    {
      id: 'leaf-1',
      name: 'index.html'
    },
    {
      id: 'tree-2',
      name: 'js',
      items: [
        {
          id: 'leaf-2',
          name: 'main.js'
        },
        {
          id: 'leaf-3',
          name: 'app.js'
        },
        {
          id: 'leaf-4',
          name: 'misc.js'
        },
        {
          id: 'tree-3',
          name: 'vendor',
          items: [
            {
              id: 'leaf-5',
              name: 'jquery.js'
            },
            {
              id: 'leaf-6',
              name: 'underscore.js'
            }
          ]
        }
      ]
    },
    {
      id: 'tree-4',
      name: 'css',
      items: [
        {
          id: 'leaf-7',
          name: 'reset.css'
        },
        {
          id: 'leaf-8',
          name: 'main.css'
        }
      ]
    }
  ]
};
