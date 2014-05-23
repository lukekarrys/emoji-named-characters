var request = require('request');
var _ = require('underscore');
var api_key = process.env.WORDNIK;
var baseUrl = 'http://api.wordnik.com/v4/word.json/';

exports.getType = function (word, callback) {
    var params = {
        uri: baseUrl + word + '/definitions',
        qs: {
            api_key: api_key
        },
        json: true
    };

    request.get(params, function (err, res, body) {

        if (err || !body || !body.length) {
            return callback(err || new Error('Not found'));
        }

        var result = _.uniq(body.map(function (item) {
            return item.partOfSpeech;
        }));

        callback(null, result);
    });
};
