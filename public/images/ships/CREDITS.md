# Ship Photo Credits

All images sourced from Wikimedia Commons. License terms require attribution; preserve this file when redistributing.

| File | Source | License |
|------|--------|---------|
| disney-magic.jpg | [Disney Magic in Oslo 2016 II](https://commons.wikimedia.org/wiki/File:Disney_Magic_in_Oslo_2016_II.jpg) | CC BY-SA 4.0 |
| disney-wonder.jpg | [Disney Wonder cruise ship in Vancouver (cropped)](https://commons.wikimedia.org/wiki/File:Disney_Wonder_cruise_ship_in_Vancouver_(cropped).jpg) | CC BY 2.0 |
| disney-dream.jpg | [Disney Dream (ship, 2011) 002](https://commons.wikimedia.org/wiki/File:Disney_Dream_(ship,_2011)_002.jpg) | CC BY 2.0 |
| disney-fantasy.jpg | [Disney Fantasy Port Canaveral Arrival](https://commons.wikimedia.org/wiki/File:Disney_Fantasy_Port_Canaveral_Arrival.jpg) | CC BY-SA 3.0 |
| disney-wish.jpg | [Disney wish nassau 08202022](https://commons.wikimedia.org/wiki/File:Disney_wish_nassau_08202022.jpg) | CC BY-SA 4.0 |
| disney-treasure.jpg | [Disney Treasure schip (cropped)](https://commons.wikimedia.org/wiki/File:Disney_Treasure_schip_(cropped).jpg) | CC BY-SA 4.0 |
| disney-destiny.jpg | [Disney Destiny (cropped)](https://commons.wikimedia.org/wiki/File:Disney_Destiny_(cropped).jpg) | CC BY-SA 4.0 |
| disney-adventure.jpg | [Disney Adventure final outfitting in Wismar 02 (cropped)](https://commons.wikimedia.org/wiki/File:Disney_Adventure_final_outfitting_in_Wismar_02_(cropped).jpg) | CC BY-SA 4.0 |

All eight ships now have a photo, so none of the cards on /ships fall back to the gradient
placeholder. If a photo is ever replaced, remember it takes **two** changes — dropping the file
into `public/images/ships/` is not enough; `hero_image_url` in `src/data/ships.ts` must point at
it too, and the row above must be updated to match the new source.

Source any replacements the same way as the photos above — Wikimedia Commons under a CC license,
with a row added to the credits table. Do not use Disney's own marketing photography; it is not
licensed for redistribution here.
