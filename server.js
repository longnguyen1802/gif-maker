const express = require("express");
const morgan = require("morgan");
const download = require('download');
const ejs = require("ejs");
const {
    formGif
} = require('./form_gif');
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/', (req, res, next) => {
    res.render('index.ejs');
})
app.post('/upload', async(req, res, next) => {
    formGif(req, res);
})

app.post('/download', async(req, res, next) => {
    //console.log(req.body.namfile);
    const filename = "new.gif";
    const filePath = req.body.namfile;
    res.download('public/'+filePath, filename, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
        else{
            
        }
    });
})
app.listen(4000);