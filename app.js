var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , doc = require('./lib/doc')
  , file = require('./lib/file');

var MOG_PATH = process.env.MOG_PATH || process.env.HOME
  , MOG_NAME = process.env.MOG_NAME || 'wiki'

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.render('index', {
    title: MOG_NAME
  , breadcrumb: 'home'
  });
});

/**
* Buscamos primero si la url termina en '/' lo cual indica que se está pidiendo
* el directorio, por lo que se genera el listado de directorios y archivos
* contenidos en el directorio requirido.
*
* Si no es un directorio, se esta pidiendo un archivo
*/
app.get('/read/*', function (req, res) {
  var urlPath = req.params[0]
    , filePath = MOG_PATH + urlPath + '.md';

  if (path.basename(filePath) === '.md') {
    file.walk(path.dirname(filePath), {
      showHidden: false,
      showExt: false
    }, function (err, results) {
      res.render('dir', {
        title: MOG_NAME
      , breadcrumb: urlPath
      , path: urlPath ? urlPath : '/'
      , content: results
      });
    });
  } else {
    doc.render(filePath, function (err, content) {
      if (err) {
        res.render('404', {
          title: MOG_NAME
        , breadcrumb: urlPath
        });
      } else {
        res.render('read', {
          title: MOG_NAME
        , breadcrumb: urlPath
        , content: content
        });
      }
    });
  }
});

/**
* Supongo que el error es fichero no encontrado, así que pongo salto de linea
* para que sea eliminado en el siguiente paso.
*
* Elimino salto de linea, eyecandy para el textarea
*/
app.get('/update/*', function (req, res) {
  var path = req.params[0];

  fs.readFile(MOG_PATH + path + '.md', function (e, c) {
    if (e) {
      c = '\n';
    }

    res.render('update', {
      title: 'wiki',
      breadcrumb: path,
      route: path,

      content: c.slice(0, c.length - 1)
    });
  });
});

/**
* Agrego salto de linea eliminado previamente, eyecandy para el textarea y 
* sustituyo el salto de linea del textarea (windows) a unix
*
* writeFile succeeds creating a new one if no directory creation is needed so,
* create intermediate directories if needed before writing to file
*/
app.post('/update/*', function (req, res) {
  var urlPath = req.params[0]
    , filePath = MOG_PATH + urlPath + '.md'

    , data = req.body.data.replace(/\r/g, '') + '\n';

  fs.stat(path.dirname(filePath), function (err, stats) {
    if (err) {
      file.mkdir(path.dirname(filePath));
    }

    fs.writeFile(filePath, data, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('saved: ' + filePath);
      }
    });
    res.redirect('/read/' + urlPath);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
