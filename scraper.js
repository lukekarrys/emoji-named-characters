var GitHubApi = require('github');
var github = new GitHubApi({version: '3.0.0'});
var async = require('async');
var fs = require('graceful-fs');
var path = require('path');

var errMsg = function (err) {
    return JSON.stringify(JSON.parse(err.message), null, 2);
};
var imagePath = __dirname + '/pngs/';
var user = 'hassankhan';
var repo = 'emojify.js';
var repoPath = 'images/emoji';


if (process.env.TOKEN) {
    github.authenticate({
        type: 'oauth',
        token: process.env.TOKEN
    });
}


github.repos.getContent({
    user: user,
    repo: repo,
    path: repoPath
}, function(err, files) {

    if (err) {
        console.error(errMsg(err));
        return;
    }

    var queue = async.queue(function (file, cb) {
        var fileName = file.name;
        var fileExt = path.extname(fileName);
        var emojiName = path.basename(fileName, fileExt);


        if (fileExt !== '.png') {
            // Only save images
            return cb();
        }

        github.gitdata.getBlob({
            user: user,
            repo: repo,
            sha: file.sha
        }, function (err, blob) {
            console.log('Saving', emojiName);
            if (err || !blob.content) {
                console.error(errMsg(err));
            } else {
                fs.writeFileSync(imagePath + fileName, blob.content, 'base64');
            }
            cb();
        });
    }, 5);

    queue.drain = function () {
        console.log('All saved');
    };

    queue.push(files);
});
