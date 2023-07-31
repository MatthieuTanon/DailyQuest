const http = require('http');
const app = require('./app');

// @param error the error object.
// @returns if given error object is a NodeJS error.
const isNodeError = (error: Error): error is NodeJS.ErrnoException => {
    return error instanceof Error;
}

const normalizePort = (val: number | string): number | boolean => {
    if (typeof val === "string") {
        const port: number = parseInt(val, 10);
        if (!isNaN(port)) {
            return port;
        }
    }

    if (typeof val === "number") {
        if (val >= 0) {
            return val;
        }
    }

    console.warn('Could not normalize listening port');
    return false;
};

const port = normalizePort(process.env.PORT || 3000);
if (!port) {
    app.set('port', port);
}

const errorHandler = (error: Error) => {
    if (isNodeError(error) && error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind  = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (isNodeError(error) && error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind  = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
})

server.listen(process.env.PORT || 3000);