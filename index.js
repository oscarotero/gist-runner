#!/usr/bin/env node

const http = require('http');
const fetch = require('node-fetch');
const id = process.argv[2];
const gist = 'https://api.github.com/gists/' + id;

const responses = {
    md: require('./responses/md'),
    index: require('./responses/index'),
    notFound: require('./responses/not-found'),
    file: require('./responses/file')
};

fetch(gist)
    .then(results => results.json())
    .then(data => {
        http.createServer(function(req, res) {
            const file = getFile(req);

            if (!file) {
                return responses.notFound(res);
            }

            if (file === 'index') {
                return responses.index(res, data);
            }

            if (file.filename.endsWith('.md')) {
                return responses.md(res, file);
            }

            return responses.file(res, file);
        }).listen(8080);

        console.log('');
        console.log(`  Gist served in ${green('http://localhost:8080')}`);
        console.log('');

        function getFile(req) {
            const key = req.url.slice(1);

            if (!key) {
                return 'index';
            }

            return data.files[key] || null;
        }
    })
    .catch(err => console.error(red(err)));

function red(message) {
    return '\u001b[' + 31 + 'm' + message + '\u001b[' + 39 + 'm';
}

function green(message) {
    return '\u001b[' + 32 + 'm' + message + '\u001b[' + 39 + 'm';
}