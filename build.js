var fs = require('graceful-fs');
var path = require('path');
var images = fs.readdirSync(__dirname + '/pngs');
var template = fs.readFileSync(__dirname + '/template.js').toString();
var all = [];

images.forEach(function (image, index) {
    all[index] = ':' + path.basename(image, '.png') + ':';
});

fs.writeFileSync('emoji-images.js', template.replace('"{{data}}"', JSON.stringify(all)), 'utf-8');
