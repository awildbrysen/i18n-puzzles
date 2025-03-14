import { assertEquals } from "@std/assert"
import * as O from "fp-ts/lib/Option.js"
import { determineTotalCost } from "./puzzle1.ts";
import { findTimesWith4Signals } from "./puzzle2.ts";
import { countValidPasswords } from "./puzzle3.ts";
import { findTravelTime } from "./puzzle4.ts";

Deno.test('puzzle1', () => {
  const input = `néztek bele az „ártatlan lapocskába“, mint ahogy belenézetlen mondták ki rá a halálos itéletet a sajtó csupa 20–30 éves birái s egyben hóhérai.
livres, et la Columbiad Rodman ne dépense que cent soixante livres de poudre pour envoyer à six milles son boulet d'une demi-tonne.  Ces
Люди должны были тамъ и сямъ жить въ палаткахъ, да и мы не были помѣщены въ посольскомъ дворѣ, который также сгорѣлъ, а въ двухъ деревянныхъ
Han hade icke träffat Märta sedan Arvidsons middag, och det hade gått nära en vecka sedan dess. Han hade dagligen promenerat på de gator, där`

  assertEquals(determineTotalCost(input), 31)
})

Deno.test('puzzle2', () => {
  const input = `2019-06-05T08:15:00-04:00
2019-06-05T14:15:00+02:00
2019-06-05T17:45:00+05:30
2019-06-05T05:15:00-07:00
2011-02-01T09:15:00-03:00
2011-02-01T09:15:00-05:00`

  assertEquals(findTimesWith4Signals(input), O.of('2019-06-05T12:15:00+00:00'))  
})

Deno.test('puzzle3', () => {
  const input = `d9Ō
uwI.E9GvrnWļbzO
ž-2á
Ģ952W*F4
?O6JQf
xi~Rťfsa
r_j4XcHŔB
71äĜ3`

  assertEquals(countValidPasswords(input), 2)
})

Deno.test('puzzle4', () => {
  const input = `Departure: Europe/London                  Mar 04, 2020, 10:00
Arrival:   Europe/Paris                   Mar 04, 2020, 11:59

Departure: Europe/Paris                   Mar 05, 2020, 10:42
Arrival:   Australia/Adelaide             Mar 06, 2020, 16:09

Departure: Australia/Adelaide             Mar 06, 2020, 19:54
Arrival:   America/Argentina/Buenos_Aires Mar 06, 2020, 19:10

Departure: America/Argentina/Buenos_Aires Mar 07, 2020, 06:06
Arrival:   America/Toronto                Mar 07, 2020, 14:43

Departure: America/Toronto                Mar 08, 2020, 04:48
Arrival:   Europe/London                  Mar 08, 2020, 16:52`

  assertEquals(findTravelTime(input), 3143)
})