/*

  # Usage

  var doc = require('./doc');

  doc.render('./foo.md', function (content) {
    console.log(content);
  });
*/

var fs = require('fs')
  , marked = require('marked')
  , hl = require('highlight').Highlight;

function render (path, cb) {
  fs.readFile(path, function (err, content) {
    if (err) {

      // substituir por un 404 handler
      cb(err);
    } else {
      try {
        cb(null, hl(marked(content.toString()), false, true));
      } catch(e) {
        console.log(e);
      }
    }
  });
}

exports.render = render;
