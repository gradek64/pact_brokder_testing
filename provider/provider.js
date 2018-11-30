const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
const path = require('path');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set('views', path.join(__dirname, 'views'));

/*server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});*/

server.get('/', (req, res) => {
  res.write('hello clients!');
  res.end();
});

server.get('/getPDF/:download', (req, res) => {
  var filename = req.params.download;
  res.setHeader('Content-type', 'application/pdf');
  const viewsPath = path.join(__dirname,'views');
  var file = viewsPath + `/${filename}`;
  res.download(file,filename);
});

server.get('/login', (req, res) => {
  const login = req.query.login;
  res.header('Content-Type', 'application/json; charset=utf-8');

  if (!login) {
    res.status(400);
    res.json({ error: 'login is required' });
  } else {
    res.json({
      login: login,
    });
  }
});

server.get('/cards', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.write('responds with cards set!');
  res.end();
});

module.exports = {
  server,
};
