function halfAsSymbol(numericText: string | number): string {
  return String(numericText).replace(/\d\.5([0]+)?$/g, (match) =>
    match.replace(/\.5/g, '½')
  )
}
export { halfAsSymbol }
