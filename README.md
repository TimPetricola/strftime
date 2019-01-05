# strftime

This is the source of [strftime.ninja](http://strftime.ninja). Strftime is a reference for the `strftime` formatting directive and a tool to format dates and times.

## Use

### Install dependencies

```
npm install
```

### Dev

The dev script will start a server at `http://localhost:8080` and compile assets on the fly:

```
npm run start
```

You can lint the JS with:

```
npm run lint
```

### Build

To prepare a deploy, run:

```
npm run build
```

This script will create a new version of `index.html`, `bundle.css` and `bundle.js` to be used as static assets.
