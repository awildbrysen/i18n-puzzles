import { pipe } from "fp-ts/lib/function.js";
import * as A from "fp-ts/lib/Array.js"
import { loadInput } from "./util.ts";

export const amountOfPoopsInPath = (input: string) => {
  const grid = input.split('\n').map(row => [...row])
  const width = grid[0].length

  return pipe(
    A.range(0, grid.length - 1),
    A.map(y => ({ y, x: (y*2) % width })),
    A.reduce(0, (c, { x, y }) => grid[y][x] === '💩' ? c + 1 : c)
  )
}

if (import.meta.main) {
  console.log(amountOfPoopsInPath(await loadInput(import.meta.filename)))
}