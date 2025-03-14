import { DateTime } from "luxon"
import * as S from "fp-ts/lib/string.js";
import * as RNEA from "fp-ts/lib/ReadonlyNonEmptyArray.js";
import { pipe } from "fp-ts/lib/function.js";
import { loadInput } from "./util.ts";

const parse = ({ date, zone }: { date: string, zone: string }) => DateTime.fromFormat(date, 'MMM dd, yyyy, HH:mm', { zone });
const parseTravel = (travel: string) => pipe(
  travel,
  S.split('\n'),
  RNEA.map(S.split(/(Departure|Arrival):\s+(.*?)\s+(.*)/gm)),
  RNEA.map(([, , zone, date]) => ({ zone, date })),
  RNEA.map(parse),
  ([d, a]) => a.diff(d).as('minutes')
)

export const findTravelTime = (itinerary: string) => pipe(
  itinerary,
  S.split('\n\n'),
  RNEA.map(parseTravel),
  RNEA.reduce(0, (acc, minutes) => acc + minutes)
)

if (import.meta.main) {
  console.log(findTravelTime(await loadInput(import.meta.filename)))
}