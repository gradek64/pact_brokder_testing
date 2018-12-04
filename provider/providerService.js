const { server } = require('./provider.js');
const port = process.env.API_PORT || 8081;

server.listen(port, () => {
  console.log(`Provider Service listening on http://localhost:${port}`);
});
