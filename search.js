#!/usr/bin/env node

const fetch = require('node-fetch');
const user = process.argv[2];
const gist = `https://api.github.com/users/${user}/gists`;

fetch(gist)
    .then(results => results.json())
    .then(data => {
        console.log('');
        console.log(`${data.length} gists found:`);
        
        data.forEach(gist => {
            const name = Object.keys(gist.files).shift();
            console.log('');
            console.log(green(`  - ${name}`));
            console.log(`    gist-runner ${gist.id}`);
        })
    })
    .catch(err => console.error(red(err)));

function red(message) {
    return '\u001b[' + 31 + 'm' + message + '\u001b[' + 39 + 'm';
}

function green(message) {
    return '\u001b[' + 32 + 'm' + message + '\u001b[' + 39 + 'm';
}