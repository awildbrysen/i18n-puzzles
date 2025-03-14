import { pipe } from "fp-ts/lib/function.js";
import * as E from "fp-ts/lib/Either.js"
import * as A from "fp-ts/lib/Array.js";
import { loadInput } from "./util.ts";

const checkLowercase = (p: string) =>
  /(\p{Ll}|[a-z])/gmu.test(p)
    ? E.right(p)
    : E.left('Password must contain at least one lowercase character')

const checkUppercase = (p: string) =>
  /(\p{Lu}|[A-Z])/gmu.test(p)
    ? E.right(p)
    : E.left('Password must contain at least one uppercase character')

const checkLength = (p: string) =>
  p.length >= 4 && p.length <= 12
    ? E.right(p)
    : E.left('Password length must be between 4 and 12')

const checkDigit = (p: string) =>
  /[0-9]/.test(p)
    ? E.right(p)
    : E.left('Password must contain at least one digit')

const checkUnicode = (p: string) =>
  // deno-lint-ignore no-control-regex
  /[^\x00-\x7F]/.test(p)
    ? E.right(p)
    : E.left('Password must contain at least one unicode character')

const checkPassword = (password: string) => 
  pipe(
    password,
    E.right,
    E.chain(checkLength),
    E.chain(checkDigit),
    E.chain(checkUppercase),
    E.chain(checkLowercase),
    E.chain(checkUnicode),
  )

export const countValidPasswords = (passwords: string) =>
  pipe(
    passwords,
    p => p.split('\n'),
    A.filter(password => E.isRight(checkPassword(password))),
    A.size
  )

if (import.meta.main) {
  console.log(countValidPasswords(await loadInput(import.meta.filename)))
}