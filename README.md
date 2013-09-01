# moghub

web interface for mogs

# Usage

    $ cd moghub/
    $ node app.js

# Config

Configuration is readed from `~/.moghub.json`.

Example:

```json
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
```

# Install

    $ git clone https://github.com/pfraces/moghub.git
    $ cd moghub/
    $ npm install
