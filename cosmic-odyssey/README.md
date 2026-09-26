# Cosmic Odyssey

A space and physics game made for Kutush (Class 12, CBSE). It runs in any modern browser and needs no install.

## Two ways to play

- **Online:** open `index.html` from a web server, or use the published claude.ai link.
- **Offline:** open `dist/cosmic-odyssey-offline.html`. It is one file with every script, style and font inside it, so it works with no internet. Copy it to a phone, laptop or pen drive and double-click it.

Progress (XP, badges, tricky cards) is saved in the browser on that device.

## What is inside

- 13 missions: Big Bang, life of stars, constellations with Indian names, spacetime and black holes, Newton's laws, myth or fact, the quiz, giants of science, scale of the universe, Physics Academy (Class 11 and 12), India in Space, ISRO Ready and Quantum World
- 300 deep-dive lessons with a predict-first question, a kid-friendly explanation, formulas, a common trap, a mini lab and follow-up doubts
- 132 myth/fact cards in 10-card themed rounds with Why? / Why this fools people / Try it / But wait… / Sources layers, plus My tricky cards
- 23 expanded Giants of the Cosmos profiles with a mini quiz, search and Surprise me
- Practice panels in every mission and chapter, from Easy to Super hard, with worked steps. Every pool has more than 100 questions
- Pop-up explanations for difficult words, a word finder and 61 source references

## Rebuilding the offline file

```
python3 tools/build_offline.py path/to/google-fonts.css dist/cosmic-odyssey-offline.html
```

The fonts CSS is the Google Fonts stylesheet for Figtree, Instrument Serif and JetBrains Mono. The script downloads each font file and embeds it, then inlines `style.css` and every script in `js/`.
