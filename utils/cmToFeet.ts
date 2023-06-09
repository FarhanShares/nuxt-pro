import { toBengaliNumber } from './toBengaliNumber'
import { halfAsSymbol } from '.'

interface cmToFeetResultObject {
  feet: number
  inches: number
  absoluteFeet: number
  formattedInches: string
}
type cmToFeetOptString = {
  asFormattedString?: true
  useBengali?: boolean
  useLongerUnits?: boolean
  useHalfAsSymbol?: boolean
}
type cmToFeetOptObject = {
  asFormattedString?: false
  useBengali?: boolean
  useLongerUnits?: boolean
  useHalfAsSymbol?: boolean
}

function cmToFeet(
  n: number,
  { useBengali, useLongerUnits, useHalfAsSymbol }: cmToFeetOptObject
): cmToFeetResultObject
/* eslint-disable */
function cmToFeet(
  n: number,
  {
    asFormattedString,
    useLongerUnits,
    useBengali,
    useHalfAsSymbol,
  }: cmToFeetOptString
): string
function cmToFeet(
  n: number,
  {
    asFormattedString = true,
    useBengali = false,
    useLongerUnits = false,
    useHalfAsSymbol = false,
  }: cmToFeetOptString | cmToFeetOptObject = {}
): string | cmToFeetResultObject {
  const absoluteFeet = (n * 0.3937) / 12
  const feet = Math.floor(absoluteFeet)
  const inches = Math.round((absoluteFeet - feet) * 12 * 2) / 2
  const formattedInches = useHalfAsSymbol ? halfAsSymbol(inches) : inches
  const units = useLongerUnits
    ? useBengali
      ? [' ফুট', ' ইঞ্চি']
      : ['ft', 'in']
    : [`'`, `"`]

  if (asFormattedString) {
    return useBengali
      ? toBengaliNumber(`${feet + units[0]} ${formattedInches + units[1]}`)
      : `${feet + units[0]} ${formattedInches + units[1]}`
  }
  /* eslint-enable */
  return {
    feet,
    inches,
    absoluteFeet,
    formattedInches: formattedInches + units[1],
  }
}

// const x = cmToFeetAlt(110, { asFormattedString: false });
// const y = cmToFeetAlt(110, { asFormattedString: true })
// console.log(x, y)

export { cmToFeet }

// Old code

/*
function cmToFeet(n: number, asFormattedString: false): cmToFeetResultObject;
function cmToFeet(n: number, asFormattedString?: true): string;
function cmToFeet(n: number, asFormattedString: boolean = true): string | cmToFeetResultObject {
    const absoluteFeet = ((n * 0.393700) / 12);
    const feet = Math.floor(absoluteFeet);
    const inches = Math.round((absoluteFeet - feet) * 12 * 2) / 2;

    if (asFormattedString) return `${feet}' ${inches}"`
    return { feet, inches, absoluteFeet }
}
*/
