export type toBengaliNumberOptions = {
  prefix?: string
  suffix?: string
  zeroAs?: string
  hidePrefixOnZero?: boolean
  hideSuffixOnZero?: boolean
}
/**
 * This method receives a number as parameter and returns it's bengali word representation
 * @param {String | Number} numericText
 * @return {String}
 */
export const toBengaliNumber = (
  numericText: string | number,
  {
    prefix = '',
    suffix = '',
    zeroAs = '',
    hideSuffixOnZero = false,
    hidePrefixOnZero = false,
  } = {} as toBengaliNumberOptions
): string => {
  const digitMap: { [key: string]: string } = {
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '0': '০',
  }

  if (numericText === null) return ''

  type match = keyof typeof digitMap
  const replacer = (match: match) => digitMap[match]
  const converted = String(numericText).replace(/\d/g, replacer)

  if (zeroAs && converted === digitMap['0'])
    return `${hidePrefixOnZero ? '' : prefix}${zeroAs}${
      hideSuffixOnZero ? '' : suffix
    }`
  return `${prefix}${converted}${suffix}`
}
