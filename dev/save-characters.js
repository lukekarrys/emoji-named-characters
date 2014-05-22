module.exports = function (emojiPath, name, character, del) {
    var emoji = require(emojiPath || '../emoji-characters');
    var fs = require('fs');
    var sorted = {};
    var fileString = '';

    if (name && del) {
        delete emoji[name];
    } else if (name && character) {
        emoji[name] = character;
    }

    var keys = Object.keys(emoji);
    keys.sort();
    keys.forEach(function (key) {
        sorted[key] = emoji[key];
    });

    fileString = 'module.exports = ' + JSON.stringify(sorted, null, 4) + ';';
    fs.writeFileSync(__dirname + '/' + (emojiPath || '../emoji-characters.js'), fileString, {encoding: 'utf8'});
};