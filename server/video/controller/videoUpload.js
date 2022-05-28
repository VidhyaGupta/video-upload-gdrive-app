"use strict";

// const appRoot = require('app-root-path');
const {videoUpload} = require('../model/video.model');

module.exports = function (request, h) {

    const file = request.payload.file
    console.log(file)

    return videoUpload(file)
    .then(resp=>{
        return h.response(resp);
    }).catch(error=>{
        return h.response(error);
    });
};