module.exports = function index(response) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('Not found');
};
