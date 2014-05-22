var fs = require('fs');
var imgDiff = require('img-diff').imagesMatch;

module.exports = function (unicode, name, tolerance, writeFile) {
    var one = fs.readFileSync(__dirname + '/../../node_modules/emojize/img/' + unicode + '.png', {encoding: 'base64'});
    var two = fs.readFileSync(__dirname + '/../../pngs/' + name + '.png', {encoding: 'base64'});
    var diffDir = __dirname + '/diffs/' + name;
    var msgPrefix = name + ' vs ' + unicode + ' -- ';
    var err = null;

    if (tolerance === 0) {
        if (one !== two) {
            err = new Error(msgPrefix + ' Did not match');
        }
    } else {
        try {
            imgDiff(one, two, tolerance);
        } catch (diffErr) {
            err = new Error(msgPrefix + diffErr.message);
            err.diffPercent = parseFloat((/[0-9]{1,2}\.?[0-9]{0,2}/).exec(diffErr.message)[0]);
            if (writeFile) {
                if (!fs.existsSync(diffDir)) {
                    fs.mkdirSync(diffDir);
                }
                fs.writeFileSync(diffDir + '/coded.png', new Buffer(diffErr.compareImages.image1).toString('base64'), {encoding: 'base64'});
                fs.writeFileSync(diffDir + '/named.png', new Buffer(diffErr.compareImages.image2).toString('base64'), {encoding: 'base64'});
                fs.writeFileSync(diffDir + '/diff.png', new Buffer(diffErr.compareImages.diff).toString('base64'), {encoding: 'base64'});
            }
        }
    }

    return err;
};
