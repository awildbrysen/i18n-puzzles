import * as A from 'fp-ts/lib/Array.js'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import { basename } from 'jsr:@std/path'
import { loadInput } from "./util.ts";

const validSMS = (m: string) => new TextEncoder().encode(m).length <= 160;
const validTweet = (m: string) => m.length <= 140;

const pricing = {
  sms: 11,
  tweet: 7,
  combo: 13,
}

const determineCost = ({ sms, tweet }: { sms: boolean, tweet: boolean }) => 
  sms && tweet ? pricing.combo : sms ? pricing.sms : pricing.tweet;

export const determineTotalCost = (messages: string) =>
  pipe(
    messages,
    m => m.split('\n'),
    A.map(E.of),
    A.map(E.chain(m => {
      const sms = validSMS(m);
      const tweet = validTweet(m);
      return !sms && !tweet ? E.left({}) : E.right({ sms, tweet });
    })),
    A.map(E.map(determineCost)),
    A.reduce(0, (acc, either) => pipe(
      either,
      E.fold(() => acc, cost => acc + cost)  
    ))
  )

if (import.meta.main) {
  console.log(determineTotalCost(await loadInput(import.meta.filename)))
}