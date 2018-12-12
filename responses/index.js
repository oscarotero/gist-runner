module.exports = function index(response, data) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    response.end(`
    <html>
        <header>
            <meta charset="utf8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Index</title>
            <link rel="shortcut icon" href="https://gist.github.com/favicon.ico" type="image/x-icon">
        </header>
        <body>
            <ul>
                ${Object.keys(data.files)
                    .map(file => `<li><a href="${file}">${file}</a></li>`)
                    .join('')}
            </ul>
        </body>
    </html>
    `);
};
