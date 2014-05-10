var fs = require('graceful-fs');
var _ = require('underscore');
var path = require('path');
var images = fs.readdirSync(__dirname + '/pngs');
var characters = require('./emoji-characters');
var template = fs.readFileSync(__dirname + '/template.js').toString();
var readme = fs.readFileSync(__dirname + '/readme.md').toString();
var names = [];
var missingCharacters = [];

_.each(images, function (image) {
    var name = path.basename(image, '.png');
    names.push(name);
    if (!characters[name]) {
        missingCharacters.push(name);
    }
});

fs.writeFileSync(
    __dirname + '/dev/missing-character.js',
    'module.exports=' + JSON.stringify(missingCharacters, null, 2) + ';',
    {encoding: 'utf8'}
);

var missingTitle = '## Missing Emoji Characters';
var missingImages = missingCharacters.map(function (missing) {
    return '![' + missing + '](https://raw.githubusercontent.com/lukekarrys/emoji-named-characters/master/pngs/' + missing + '.png)';
});
var splitReadme = readme.split(missingTitle);
fs.writeFileSync(
    __dirname + '/readme.md',
    splitReadme[0] + missingTitle + '\n\n' + missingImages.join(' ') + '\n',
    {encoding: 'utf8'}
);

fs.writeFileSync(
    'index.js',
    template
        .replace('"{{mapping}}"', JSON.stringify(characters))
        .replace('"{{missing}}"', JSON.stringify(missingCharacters)),
    {encoding: 'utf8'}
);
