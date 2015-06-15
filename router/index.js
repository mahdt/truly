module.exports = function (server) {
    server.use('/query', require('./routes/query'));
    server.use('/post', require('./routes/number'));
};