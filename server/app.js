'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const env = require('node-env-file');
env('.env');

let options = {
    port: 5000,
    host:'localhost'
};

const init = async () => {

    const server = Hapi.server(options);

    routes.map(route=>{
        server.route(route);
    });


    server.route({
        method: 'GET',
        path: '/test',
        handler: (request, h) => {
            return 'Active';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();