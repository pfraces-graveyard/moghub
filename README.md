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
    "doc": {
      "title": "Dev Docs",
      "path": "~/doc"
    },
    "home": {
      "title": "Home Docs",
      "path": "~/Desktop/Documents"
    },
    "todo": {
      "title": "To-Do List",
      "path": "~/todo"
    }
  }
}
```

# Install

    $ git clone https://github.com/pfraces/moghub.git
    $ cd moghub/
    $ npm install
