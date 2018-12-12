module.exports = function(response, file) {
    response.writeHead(200, {
        'Content-Type': file.type + '; charset=utf-8',
        'Content-Length': file.size
    });

    response.end(file.content);
};
