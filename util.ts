import { basename } from "jsr:@std/path/basename";

export const loadInput = async (filename?: string) => await Deno.readTextFile(`inputs/${basename(filename!).slice(0, -3)}.txt`)