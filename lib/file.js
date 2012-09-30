var fs = require('fs')
  , path = require('path');

/*
* mkdir()
* from http://stackoverflow.com/a/10600228
*/

function mkdir (path, root) {

    var dirs = path.split('/'), dir = dirs.shift(), root = (root||'')+dir+'/';

    try { fs.mkdirSync(root); }
    catch (e) {
        //dir wasn't made, something went wrong
        if(!fs.statSync(root).isDirectory()) throw new Error(e);
    }

    return !dirs.length||mkdir(dirs.join('/'), root);
}

/*
* walk()
* from http://stackoverflow.com/a/5827895
*/

var walk = function(dir, opts, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      if (file.charAt(0) === '.' && !opts.showHidden) {
        if (!--pending) done(null, results);
      } else {
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, opts, function(err, res) {
              results[path.basename(file) + '/'] = res;
              if (!--pending) done(null, results);
            });
          } else {
            if (opts.showExt) {
              results.push(path.basename(file));
            } else {
              results.push(path.basename(file, path.extname(file)));
            }
            if (!--pending) done(null, results);
          }
        });
      }
    });
  });
};


exports.mkdir = mkdir;
exports.walk = walk;
