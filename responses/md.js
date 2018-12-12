const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const markdown = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {
                console.log(err);
            }
        }

        return '';
    }
});

module.exports = function(response, file) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    return response.end(md(file.content));
};

function md(content) {
    const css_markdown = fs.readFileSync(
        path.join(__dirname, '../node_modules/github-markdown-css/github-markdown.css')
    );
    const css_highlight = fs.readFileSync(path.join(__dirname, '../node_modules/highlight.js/styles/github-gist.css'));

    return Buffer.from(`
    <html>
    <head>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Markdown file</title>
    <link rel="shortcut icon" href="https://gist.github.com/favicon.ico" type="image/x-icon">
    <style>
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }

        @media (max-width: 767px) {
            .markdown-body {
                padding: 15px;
            }
        }
        ${css_markdown.toString()}
        ${css_highlight.toString()}
    </style>
    <head>
    <body>
    <article class="markdown-body">
        ${markdown.render(content)}
    </article>
    <body>
    </html>
    `);
}
