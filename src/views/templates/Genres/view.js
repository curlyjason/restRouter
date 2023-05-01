const Html = require('../../helpers/HtmlHelper');

function getIndexLink(genre) {
    return Html.p(
        Html.link('Index', '/genres/')
    )
}

function getAddLink(genre) {
    return Html.p(
        Html.link('New', '/genres/add/')
    )
}

function getEditLink(genre) {
    return Html.p(
        Html.link('Edit', `/genres/edit/${genre._id}`)
    )
}

function getDeleteLink(genre) {
    return Html.p(
        Html.link('Delete', `/genres/delete/${genre._id}`)
    )
}

async function run() {
    let genre = await this.genre;
    let accum = '';

    accum += getIndexLink(genre);
    accum += getAddLink(genre);
    accum += getEditLink(genre);
    accum += getDeleteLink(genre);

    accum += '<dl>';

    for(let i = 0; i < this.allowedKeys.length; i++) {
        accum += `<dt>${this.allowedKeys[i]}</dt>
            <dd>${genre[this.allowedKeys[i]]}</dd>`
    }

    return accum + '</dl>';
}

module.exports.run = run;

