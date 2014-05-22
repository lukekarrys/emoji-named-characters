var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var emojis = require('../../emoji-characters');
var missing = require('../missing-character');
var comparedEmoji = require('./compared-emoji');
var emojiNames = Object.keys(emojis);
var saveEmoji = require('../save-characters');
var fs = require('fs');
var jade = require('jade');
var emoji = _.compact(emojiNames.map(function (e) {
    return comparedEmoji[e] ? null : {
        unicode: emojis[e],
        img: '/' + e + '.png',
        name: e
    };
}));
emoji = emoji.concat(missing.map(function (e) {
    return {
        unicode: '',
        img: '/' + e + '.png',
        name: e
    };
}));

var index = jade.compile(fs.readFileSync(__dirname + '/compare.jade'))({
    emoji: emoji
});

app.use(bodyParser());
app.use(express.static(__dirname + '/../../pngs'));
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.send(index);
});

app.post('/save', function(req, res){
    console.log(req.body.name, req.body.character);
    saveEmoji('./compare/compared-emoji.js', req.body.name, req.body.character);
    res.send('done');
});

app.listen(3001);
console.log('Started server');

