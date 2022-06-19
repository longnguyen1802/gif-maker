const {
    createGif
} = require("./gif_make");
const {
    upload
} = require("./upload_file");
const path = require('path')
var dir = path.join(__dirname, './upload/input');
var filename = './output/intermediate-octree.gif';

function formGif(req, res) {
    upload(req, res, async function(err) {
        // if (err) {
        //     return res.send("Something wrong");
        // }
        //console.log("Start");
        createGif('octree', dir).then(() => {
            res.render('gif_preview', {
                filename: filename
            })
        }).catch(
            res.render('gif_preview', {
                filename: filename
            })
        );
    })
}
module.exports = {
    formGif
};