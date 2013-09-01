# moghub

web interface for mogs

# Install

    $ git clone https://github.com/pfraces/moghub.git
    $ cd moghub/
    $ npm install

# Usage

    $ cd moghub/
    $ node app.js

# Config

The configuration is readed from `~/.moghub.json`.

Example configuration:

    {
      "port": 7654,
      "mogs": {
        "Dev Docs": {
          "route": "/doc",
          "path": "~/doc"
        },
        "Home Docs": {
          "route": "/home",
          "path": "~/Desktop/Documents"
        },
        "To-Do List": {
          "route": "/todo",
          "path": "~/todo"
        }
      }
    }
