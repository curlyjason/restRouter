const Html = require('../../helpers/HtmlHelper');

function getIndexLink(genre) {
    return Html.p(
        Html.link('Index', '/genres/')
    )
}

function getAddLink(genre) {
    return Html.p(
        Html.link('New', 'add/')
    )
}

function getEditLink(genre) {
    return Html.p(
        Html.link('Edit', `edit/${genre._id}`)
    )
}

function getDeleteLink(genre) {
    return Html.p(
        Html.link('Delete', `edit/${genre._id}`)
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

