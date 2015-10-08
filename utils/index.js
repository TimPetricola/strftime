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

export function searchReference(q, entries) {
  q = q.toLowerCase().trim();

  if (!q.length || q === '%') {
    return entries;
  }

  return entries.filter((entry) => (
    // Code matches
    entry.format.toLowerCase() === q.replace('%', '') ||
    // Label matches
    q.length >= 2 && entry.label.toLowerCase().indexOf(q) > -1
  ));
}
