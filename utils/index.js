import randomColor from 'randomcolor';

let colors = {};

export function color(key, seed = 1) {
  colors[key] = colors[key] || randomColor({ luminosity: 'light', seed: seed });
  return colors[key];
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
