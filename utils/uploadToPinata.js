const fs = require("fs")
const path = require("path")
const pinataSDK = require("@pinata/sdk")

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)
    console.log(files)
    return files
}

module.exports = { storeImages }
