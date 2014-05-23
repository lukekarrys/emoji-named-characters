var fs = require('graceful-fs');
var _ = require('underscore');
var path = require('path');
var names = _.compact(fs.readdirSync(__dirname + '/pngs').map(function (i) {
    return i.indexOf('.png') > -1 ? path.basename(i, '.png') : null;
}));
var save = require('./dev/save-characters');
var characters = require('./emoji-characters');
var template = fs.readFileSync(__dirname + '/template.js').toString();
var readme = fs.readFileSync(__dirname + '/readme.md').toString();

var missingFromCharacters = _.difference(names, _.keys(characters));
var missingFromImages = _.difference(_.keys(characters), names);

// Remove missingFromImages from characters
_.each(missingFromImages, function (i) {
    delete characters[i];
    save(null, i, null, true);
});

fs.writeFileSync(
    __dirname + '/dev/missing-character.js',
    'module.exports = ' + JSON.stringify(missingFromCharacters, null, 2) + ';',
    {encoding: 'utf8'}
);

var missingTitle = '## Missing Emoji Characters';
var missingImages = missingFromCharacters.map(function (missing) {
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
        .replace('"{{mapping}}"', JSON.stringify(characters)),
    {encoding: 'utf8'}
);
