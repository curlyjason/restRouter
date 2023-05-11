const Html = require('../../helpers/HtmlHelper');

function getIndexLink(movie) {
    return Html.p(
        Html.link('Index', '/movies/')
    )
}

function getAddLink(movie) {
    return Html.p(
        Html.link('New', '/movies/add/')
    )
}

function getEditLink(movie) {
    return Html.p(
        Html.link('Edit', `/movies/edit/${movie._id}`)
    )
}

function getDeleteLink(movie) {
    return Html.p(
        Html.link('Delete', `/movies/delete/${movie._id}`)
    )
}

async function run() {
    let movie = await this.movie;
    let accum = '';

    accum += getIndexLink(movie);
    accum += getAddLink(movie);
    accum += getEditLink(movie);
    accum += getDeleteLink(movie);

    accum += '<dl>';

    for(let i = 0; i < this.allowedKeys.length; i++) {
        accum += `<dt>${this.allowedKeys[i]}</dt>
            <dd>${movie[this.allowedKeys[i]]}</dd>`
    }

    return accum + '</dl>';
}

module.exports.run = run;

