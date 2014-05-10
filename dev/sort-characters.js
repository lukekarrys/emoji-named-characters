var emoji = require('../emoji-characters');
var fs = require('fs');
var keys = Object.keys(emoji);
var sorted = {};
var fileString = '';

keys.sort();
keys.forEach(function (key) {
    sorted[key] = emoji[key];
});

fileString = 'module.exports = ' + JSON.stringify(sorted, null, 4) + ';';
fs.writeFileSync(__dirname + '/../emoji-characters.js', fileString, {encoding: 'utf8'});