Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var fs = require('graceful-fs');
var _ = require('underscore');
var imgDiff = require('./diff');

var useDiff = process.argv.join(' ').indexOf('--diff') > -1;
var forceMatch = process.argv.join(' ').indexOf('--force') > -1;
var tolerance = useDiff ? 10 : 0;

var codes = require('../../emoji-characters');
var currentMissingImages = require('./missing-character');

var codePath = __dirname + '/../../node_modules/emojize/img/';
var emojiCodes = _.invert(require('../../node_modules/emojize/lib/emoji'));
var diffs = {};
var forceMatches = [];

var namedValues = _.values(codes);
if (namedValues.length) {
    _.each(emojiCodes, function (code, name, list) {
        if (namedValues.indexOf(code) > -1) {
            delete list[name];
        }
    });
}

console.log(currentMissingImages.length);
console.log('-----------');

_.each(currentMissingImages, function (emojiName) {
    var diffMin, diffMax, diffAvg, matchPercent;

    var foundCode = _.find(emojiCodes, function (code, codeFileName, list) {
        var codeFile = codePath + codeFileName + '.png';
        var exists = fs.existsSync(codeFile);
        
        var result;

        if (exists) {
            result = imgDiff(codeFileName, emojiName, tolerance);

            if (result instanceof Error) {
                if (result.diffPercent) {
                    if (!diffs[emojiName]) {
                        diffs[emojiName] = [];
                    }
                    diffs[emojiName].push({
                        percent: result.diffPercent,
                        code: code
                    });
                }
                return false;
            } else {
                delete list[codeFileName];
                return true;
            }
        } else {
            return false;
        }
    });

    if (!foundCode) {
        if (diffs[emojiName] && diffs[emojiName].length) {
            diffMin = Math.min.apply(null, _.pluck(diffs[emojiName], 'percent'));
            diffMax = Math.max.apply(null, _.pluck(diffs[emojiName], 'percent'));
            diffAvg = diffs[emojiName].reduce(function(a, b) { return a.percent + b.percent; }) / diffs[emojiName].length;
            matchPercent = 100 - diffMin;
        }

        if (diffMin && forceMatch) {
            console.log('Match forced with', matchPercent, '%');
            foundCode = _.find(diffs[emojiName], function (d) { return d.percent === diffMin; }).code;
            forceMatches.push({
                code: foundCode,
                percent: diffMin,
                name: emojiName
            });
        }
    }

    if (foundCode) {
        console.log('SUCCESS:', foundCode, 'is equal to', emojiName);
        codes[emojiName] = foundCode;
        currentMissingImages.remove(emojiName);
    } else {
        console.log('ERROR: no code could be found for', emojiName);
        currentMissingImages.push(emojiName);
    }

    currentMissingImages = _.uniq(currentMissingImages).sort();

    fs.writeFileSync(__dirname + '/../../emoji-characters.js', 'module.exports = ' + JSON.stringify(codes, null, 2) + ';', {encoding: 'utf8'});
    fs.writeFileSync(__dirname + '/../missing-character.js', 'module.exports = ' + JSON.stringify(currentMissingImages, null, 2) + ';', {encoding: 'utf8'});

    console.log('-------------------');
});
