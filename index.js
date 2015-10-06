import React from 'react';
import App from './src/js/app';

if (typeof document !== 'undefined') {
  const props = JSON.parse(document.getElementById('props').innerHTML)
  props.date = new Date(props.date);
  React.render(React.createElement(App, props), document);
}

export default function render(locals, callback) {
   const html = React.renderToString(React.createElement(App, locals));
   callback(null, `<!doctype>${html}`);
};

