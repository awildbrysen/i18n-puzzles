import { pipe } from "fp-ts/lib/function.js";
import * as R from "fp-ts/lib/Record.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import { loadInput } from "./util.ts";

export const findTimesWith4Signals = (timestamps: string) => pipe(
  timestamps,
  t => t.split('\n'),
  A.map(ts => new Date(ts)),
  A.reduce(
    {} as Record<string, Array<Date>>,
    (acc, date) => {
      const k = date.toISOString()
      return R.upsertAt(k, [...(acc[k] ?? []), date])(acc)
    }
  ),
  R.filter(x => x.length >= 4),
  R.keys,
  A.head,
  O.map(k => k.replace(/\.000Z$/, '+00:00'))
)

if (import.meta.main) {
  console.log(findTimesWith4Signals(await loadInput(import.meta.filename)))
}