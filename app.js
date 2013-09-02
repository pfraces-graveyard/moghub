var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , doc = require('./lib/doc')
  , file = require('./lib/file');

var config = JSON.parse(fs.readFileSync('/home/pau/.moghub.json')),
    app = express();

app.configure(function(){
  app.set('port', config.port || 3000);
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

app.get('/:mog/', function (req, res) {
  var mog = config.mogs[req.params.mog];
  res.render('index', {
    title: mog.title
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
app.get('/:mog/read/*', function (req, res) {
  var mog = config.mogs[req.params.mog],
      route = req.params[0],
      filePath = mog.path + '/' + route + '.md';

  if (path.basename(filePath) === '.md') {
    file.walk(path.dirname(filePath), {
      showHidden: false,
      showExt: false
    }, function (err, results) {
      res.render('dir', {
        title: mog.title,
        breadcrumb: route,
        path: route ? route : '/',
        content: results
      });
    });
  } else {
    doc.render(filePath, function (err, content) {
      if (err) {
        res.render('404', {
          title: mog.title,
          breadcrumb: route
        });
      } else {
        res.render('read', {
          title: mog.title,
          breadcrumb: route,
          content: content
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
app.get('/:mog/update/*', function (req, res) {
  var mog = config.mogs[req.params.mog],
      route = req.params[0],
      filePath = mog.path + '/' + route + '.md';

  fs.readFile(filePath, function (err, data) {
    if (err) {
      data = '\n';
    }

    res.render('update', {
      title: mog.title,
      breadcrumb: route,
      route: route,
      content: data.slice(0, data.length - 1)
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
app.post('/:mog/update/*', function (req, res) {
  var mog = config.mogs[req.params.mog],
      route = req.params[0],
      filePath = mog.path + '/' + route + '.md',
      data = req.body.data.replace(/\r/g, '') + '\n';

  fs.stat(path.dirname(filePath), function (err, stats) {
    if (err) {
      file.mkdir(path.dirname(filePath));
    }

    fs.writeFile(filePath, data, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved: ' + filePath);
      }
      res.redirect('/' + req.params.mog + '/read/' + route);
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("listening on port " + app.get('port'));
});
