import randomColor from 'randomcolor';

let colors = {};

export function color(key, seed = 1) {
  colors[key] = colors[key] || randomColor({ luminosity: 'light', seed: seed });
  return colors[key];
}

export function placeCaretAtEnd(node) {
  node.focus();
  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange !== 'undefined') {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(node);
    textRange.collapse(false);
    textRange.select();
  }
}
