var fs = require('graceful-fs');
var _ = require('underscore');
var path = require('path');
var async = require('async');
var names = _.compact(fs.readdirSync(__dirname + '/pngs').map(function (i) {
    return i.indexOf('.png') > -1 ? path.basename(i, '.png') : null;
}));
var save = require('./dev/save-characters');
var characters = require('./emoji-characters');
var template = fs.readFileSync(__dirname + '/template.js').toString();
var readme = fs.readFileSync(__dirname + '/readme.md').toString();

var missingFromCharacters = _.difference(names, _.keys(characters));
var missingFromImages = _.difference(_.keys(characters), names);

var syllables = require('./syllables.json');
var syllable_overrides = require('./syllable_overrides.json');

var wordnik = require('./dev/wordnik');
var type_overrides = require('./type_overrides.json');
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

async.eachSeries(Object.keys(characters), function (name, cb) {
    var count = 0;

    name.toUpperCase().split('_').forEach(function (word) {
        if (syllable_overrides[word]) {
            count += syllable_overrides[word];
        } else if (syllables[word]) {
            if (!Array.isArray(syllables[word])) {
                count += syllables[word];
            } else {
                count += syllables[word][0];
            }
        }
    });
    
    characters[name] = {
        character: characters[name],
        syllables: count
    };

    if (type_overrides.hasOwnProperty(name)) {
        characters[name].types = type_overrides[name];
        return cb();
    }

    wordnik.getType(name, function (err, types) {
        if (err || !types || !types.length) {
            type_overrides[name] = [];
        } else {
            type_overrides[name] = types;
        }

        characters[name].types = types;
        cb();
    });
}, function () {
    fs.writeFileSync(
        'index.js',
        template
            .replace('"{{mapping}}"', JSON.stringify(characters)),
        {encoding: 'utf8'}
    );

    fs.writeFileSync('./type_overrides.json', JSON.stringify(type_overrides, null, 2), 'utf8');
});
