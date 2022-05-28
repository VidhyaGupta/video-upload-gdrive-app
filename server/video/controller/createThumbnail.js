"use strict";

// const appRoot = require('app-root-path');
const {createThumbnail} = require('../model/video.model');

module.exports = function (request, h) {

    return createThumbnail(request.payload.file).then(resp=>{
        return h.response(resp);
    }).catch(error=>{
        return h.response(error);
    });
};