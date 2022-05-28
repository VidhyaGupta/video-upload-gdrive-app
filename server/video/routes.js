"use strict";
const videoUpload = require('./controller/videoUpload');
const createThumbnail = require('./controller/createThumbnail');

module.exports = function(){
    return [
        {
            method: 'POST',
            path: '/video/drive/upload',
            handler: videoUpload,
            options: {
                cors: true,
                payload: {
                  maxBytes: 209715200,
                  output: 'file',
                  parse: true,
                  multipart: true     // <-- this fixed the media type error
                }
            },
        }
    ]
}();