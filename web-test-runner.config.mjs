export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  testFramework: {
    config: {
      ui: 'bdd'
    }
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script src="node_modules/chai/chai.js"></script>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `
}; 