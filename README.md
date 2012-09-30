# mog.js

**mog** _(markdown over git)_ web frontend for node

# instalación

    $ git clone https://github.com/pfraces/mog.js.git
    $ cd mog.js/
    $ npm install

# levantar servicio

    $ cd mog.js/
    $ node app.js

# environment variables

## PORT

By default, mog.js use the same default port as in express: port 3000

You can set your desired port with PORT env var:

    $ PORT=7000 node app.js

Or exporting the variable before:

    $ export PORT=7000
    $ node app.js

There are some ports that require root privileges, port 80 for instance

    $ sudo PORT=80 node app.js

## MOG

mog.js search for markdown files and directories in $HOME env var by default

You can (and in major cases you must) set your desired mog path with MOG env
var:

    $ MOG=~/Desktop/doc/ PORT=7001 node app.js &
    $ MOG=~/Desktop/TODO/ PORT=7002 node app.js &

**NOTE:** MOG paths must finish in backslash ('/')

# ui

Para obtener el frontend web, desde un navegador web ir a:

    http://127.0.0.1:<PORT>/

See [#port]() and set <PORT> with the appropiate value.

If no <PORT> is specified, web browsers defaults to port 80, so:

    http://127.0.0.1:80/

has the same effect as:

    http://127.0.0.1/

# arch

## backend

*   markdown
*   git

## middleware

*   express

## frontend

*   _homemade_

