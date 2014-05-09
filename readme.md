#emoji-named-characters.js

A mapping of emoji names to their characters, as well as images.

## What is this?

Two things:

1. A list of all emojis by name and a directory of images from [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com). This was very easy and I took the idea of scraping [hassankhan/emojify.js](https://github.com/hassankhan/emojify.js) from [henrikjoreteg/emoji-images.js](https://github.com/henrikjoreteg/emoji-images.js).

2. A mapping of all of those names to actual emoji characters. This was a little more difficult. If you look in the `dev/` directory, you'll see some tools I used to achieve this.


## What is provides

Support for browserify, amd, or a browser global. You will get an object with the following properties:

- `names`: An array of all the names of the emojis
- `mapping`: An object with the keys being the names and the values being the emoji characters
- `missing`: An array of names that don't exist as emoji characters (or I couldn't find them).


## install

Grab it here or on npm:

```
npm install emoji-named-characters
```

## Missing Emoji Characters

- ![bowtie](https://github.com/lukekarrys/emoji-named-characters/pngs/bowtie.png)
- ![busstop](https://github.com/lukekarrys/emoji-named-characters/pngs/busstop.png)
- ![feelsgood](https://github.com/lukekarrys/emoji-named-characters/pngs/feelsgood.png)
- ![finnadie](https://github.com/lukekarrys/emoji-named-characters/pngs/finnadie.png)
- ![fu](https://github.com/lukekarrys/emoji-named-characters/pngs/fu.png)
- ![goberserk](https://github.com/lukekarrys/emoji-named-characters/pngs/goberserk.png)
- ![godmode](https://github.com/lukekarrys/emoji-named-characters/pngs/godmode.png)
- ![hocho](https://github.com/lukekarrys/emoji-named-characters/pngs/hocho.png)
- ![hurtrealbad](https://github.com/lukekarrys/emoji-named-characters/pngs/hurtrealbad.png)
- ![loop](https://github.com/lukekarrys/emoji-named-characters/pngs/loop.png)
- ![metal](https://github.com/lukekarrys/emoji-named-characters/pngs/metal.png)
- ![neckbeard](https://github.com/lukekarrys/emoji-named-characters/pngs/neckbeard.png)
- ![octocat](https://github.com/lukekarrys/emoji-named-characters/pngs/octocat.png)
- ![rage1](https://github.com/lukekarrys/emoji-named-characters/pngs/rage1.png)
- ![rage2](https://github.com/lukekarrys/emoji-named-characters/pngs/rage2.png)
- ![rage3](https://github.com/lukekarrys/emoji-named-characters/pngs/rage3.png)
- ![rage4](https://github.com/lukekarrys/emoji-named-characters/pngs/rage4.png)
- ![shipit](https://github.com/lukekarrys/emoji-named-characters/pngs/shipit.png)
- ![speaker](https://github.com/lukekarrys/emoji-named-characters/pngs/speaker.png)
- ![squirrel](https://github.com/lukekarrys/emoji-named-characters/pngs/squirrel.png)
- ![suspect](https://github.com/lukekarrys/emoji-named-characters/pngs/suspect.png)
- ![trollface](https://github.com/lukekarrys/emoji-named-characters/pngs/trollface.png)
- ![uk](https://github.com/lukekarrys/emoji-named-characters/pngs/uk.png)
