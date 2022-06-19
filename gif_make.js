const GIFEncoder = require('gif-encoder-2')
const {
    createCanvas,
    Image
} = require('canvas')
const {
    createWriteStream,
    readdir
} = require('fs')
const {
    promisify
} = require('util')
const fsExtra = require('fs-extra');
const path = require('path')
const readdirAsync = promisify(readdir)
async function createGif(algorithm, folder) {
    return new Promise(async resolve1 => {

        // read image directory
        const files = await readdirAsync(folder)
            // find the width and height of the image
        const [width, height] = await new Promise(resolve2 => {
                const image = new Image()
                image.onload = () => resolve2([image.width, image.height])
                image.src = path.join(folder, files[0])
            })
            // base GIF filepath on which algorithm is being used
        const dstPath = path.join(__dirname, 'public/output', `intermediate-${algorithm}.gif`)
            // create a write stream for GIF data
        const writeStream = createWriteStream(dstPath)
            // when stream closes GIF is created so resolve promise
        writeStream.on('close', () => {
                resolve1()
            })
        const encoder = new GIFEncoder(width, height, algorithm)
            // pipe encoder's read stream to our write stream
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(200)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
            // draw an image for each file and add frame to encoder
        for (const file of files) {
            //console.log(file);
            await new Promise(resolve3 => {
                const image = new Image()
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                    encoder.addFrame(ctx)
                    resolve3()
                }
                image.src = path.join(folder, file)
            })
        }
        fsExtra.emptyDirSync(folder);
        resolve1("sucesss");
    })
}

module.exports = {
    createGif
};