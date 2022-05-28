"use strict";
// const appRoot = require('app-root-path');
// const videoUpload = require('./controller/videoUpload');
// const createThumbnail = require('./controller/createThumbnail');
const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')
var ffmpeg = require('fluent-ffmpeg');
const env = require('node-env-file');
env('.env');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const videoUpload = async (file) => {
    try {

        const response = await drive.files.create({
            requestBody: {
                name: file.filename,
                mimeType: 'video/*'
            },
            media: {
                mimeType: 'video/*',
                body: fs.createReadStream(file.path)
            }
        })

        
        console.log(response)
       
        return ({ message: "Success: Video has been uploaded", result: response });
    }
    catch(error) {
        console.log(error.message)
        return error
    }

}
module.exports = {
    videoUpload
};