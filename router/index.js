module.exports = function (server) {
    server.use('/query', require('./routes/query'));
    server.use('/number', require('./routes/number'));
};