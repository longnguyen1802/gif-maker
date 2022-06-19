const multer = require("multer");

const {
    v4: uuidv4
} = require('uuid');

var dir = './uploads';
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, dir);
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
}).array('files', 30);

module.exports = {
    upload
}