import randomColor from "randomcolor"

export const color = (key: string): string =>
  randomColor({ luminosity: "light", seed: key })

export function searchReference(q: string, entries: any[]) {
  q = q.toLowerCase().trim()

  if (!q.length || q === "%") {
    return entries
  }

  return entries.filter(
    entry =>
      // Code matches
      entry.format.toLowerCase() === q.replace("%", "") ||
      // Label matches
      (q.length >= 2 && entry.label.toLowerCase().indexOf(q) > -1)
  )
}
