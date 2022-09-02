const fs = require("fs")
const path = require("path")
const pinataSDK = require("@pinata/sdk")
require("dotenv").config()

const { PINATA_API_KEY, PINATA_API_SECRET } = process.env
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)
    const responses = []

    console.log("Uploading to Pinata!")

    for (fileIndex in files) {
        console.log(`Working on ${fileIndex}...`)
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
            responses.push(response)
        } catch (error) {
            console.error(error)
        }
    }
    return { responses, files }
}

module.exports = { storeImages }
