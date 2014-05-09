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

![bowtie](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/bowtie.png) ![busstop](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/busstop.png) ![feelsgood](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/feelsgood.png) ![finnadie](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/finnadie.png) ![fu](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/fu.png) ![goberserk](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/goberserk.png) ![godmode](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/godmode.png) ![hocho](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/hocho.png) ![hurtrealbad](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/hurtrealbad.png) ![loop](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/loop.png) ![metal](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/metal.png) ![neckbeard](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/neckbeard.png) ![octocat](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/octocat.png) ![rage1](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/rage1.png) ![rage2](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/rage2.png) ![rage3](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/rage3.png) ![rage4](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/rage4.png) ![shipit](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/shipit.png) ![speaker](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/speaker.png) ![squirrel](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/squirrel.png) ![suspect](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/suspect.png) ![trollface](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/trollface.png)
