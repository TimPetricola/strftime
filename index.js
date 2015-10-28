import { createElement, renderToString } from 'react';
import { render as renderDOM } from 'react-dom';

import App from './components/app';

if (typeof document !== 'undefined') {
  const props = JSON.parse(document.getElementById('props').innerHTML)
  props.date = new Date(props.date);
  renderDOM(createElement(App, props), document);
}

export default function render(locals, callback) {
   const html = renderToString(createElement(App, locals));
   callback(null, `<!doctype>${html}`);
};

