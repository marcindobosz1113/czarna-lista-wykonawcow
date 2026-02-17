export function pluralize(count: number, forms: [string, string, string]) {
  if (count === 1) return `${count} ${forms[0]}`

  const lastDigit = count % 10
  const lastTwo = count % 100

  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return `${count} ${forms[1]}`
  }

  return `${count} ${forms[2]}`
}
