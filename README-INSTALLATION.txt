LEXICONIA — WORLD 2: WATER WORLD
THEME 01 — PLANTS & FLOWERS
INCREMENTAL GITHUB READY UPDATE

BUILD ID
lexiconia-world2-water-world-theme01-v1

WHAT THIS PACKAGE DOES
- Preserves the existing Lexiconia access link and World 1 progress.
- Replaces world1.html only to add the unlocked button:
  “GO TO WORLD 2”.
- Adds world2.html as the Water World map.
- Adds an independent Theme HTML:
  themes/world2/01-plants-flowers.html
- Adds 30 local vocabulary illustrations and 13 dedicated Shadow silhouettes.
- Keeps the same 12 game mechanics used in World 1.
- Expands Memory Grove to 30 cards / 15 pairs.
- Stores Water World progression per hero in:
  lexiconia.world2.waterWorld.v1
- Continues using the existing World 1 economy stored per hero.

AUTOMATIC UNLOCK RULE
World 2 opens only when the active hero has completed all 20 Themes in World 1.

20 / 20 World 1 Themes completed
→ GO TO WORLD 2 appears
→ world2.html opens

Less than 20 / 20 completed
→ Water World remains locked

FILES TO MERGE INTO THE EXISTING REPOSITORY ROOT
world1.html                         REPLACE the existing file
world2.html                         ADD
.nojekyll                           KEEP / MERGE
themes/world2/                      ADD
assets/world2/                      ADD
audio/forest.mp3                    SAME approved audio; may be overwritten
audio/boss.mp3                      SAME approved audio; may be overwritten
audio/reward.mp3                    SAME approved audio; may be overwritten

DO NOT DELETE
- index.html
- the existing assets/ content from World 1
- the existing audio/ content
- .nojekyll
- any other existing Lexiconia files

RECOMMENDED UPLOAD METHOD
Use GitHub Desktop so the folder structure is preserved. Do not upload hundreds
of files individually through the GitHub web uploader.

AFTER DEPLOYMENT
1. Open the same public Lexiconia link currently used by students.
2. Use a profile that completed all 20 World 1 Themes.
3. Open the World 1 victory screen.
4. Confirm that “GO TO WORLD 2” appears.
5. Enter Water World.
6. Confirm that Theme 01 — Plants & Flowers is available.
7. Confirm that Themes 02–20 display “Coming Soon”.
8. Test Picture Quest, Memory Grove, Shadow Match and the Mini Boss.

IMPORTANT
This is an incremental update, not a complete replacement of the full existing
Lexiconia repository. It requires the current World 1 assets already present in
the repository.
