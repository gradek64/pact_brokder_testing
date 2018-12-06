var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
// set the view engine to ejs
app.set('view engine', 'ejs');
// make express look in the public directory for assets (css/js/img)
//app.use(express.static(__dirname + '/public'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the home page route
app.get('/', function(req, res) {
  res.header('Content-Type', 'text/html; charset=utf-8');
  // ejs render automatically looks in the views folder
  res.render('index');
  //res.end('hi');
});

app.get('/getPDF/:download', (req, res) => {
  var filename = req.params.download;
  res.setHeader('Content-type', 'application/pdf');
  const viewsPath = path.join(__dirname,'views');
  var file = viewsPath + `/${filename}`;
  res.download(file,filename);
});

app.get('/login', (req, res) => {
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

app.get('/cards', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.write('responds with cards set!');
  res.end();
});

app.get('/fruits', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.write('today you should have bannana!');
  res.end();
});

app.get('/json', (req, res) => {
  //specifif header only for this route
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json({json:'it is json response object set'});
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});