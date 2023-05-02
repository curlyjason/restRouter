const Html = require('../../helpers/HtmlHelper');

function getIndexLink(customer) {
    return Html.p(
        Html.link('Index', '/customers/')
    )
}

function getAddLink(customer) {
    return Html.p(
        Html.link('New', '/customers/add/')
    )
}

function getEditLink(customer) {
    return Html.p(
        Html.link('Edit', `/customers/edit/${customer._id}`)
    )
}

function getDeleteLink(customer) {
    return Html.p(
        Html.link('Delete', `/customers/delete/${customer._id}`)
    )
}

async function run() {
    let customer = await this.customer;
    let accum = '';

    accum += getIndexLink(customer);
    accum += getAddLink(customer);
    accum += getEditLink(customer);
    accum += getDeleteLink(customer);

    accum += '<dl>';

    for(let i = 0; i < this.allowedKeys.length; i++) {
        accum += `<dt>${this.allowedKeys[i]}</dt>
            <dd>${customer[this.allowedKeys[i]]}</dd>`
    }

    return accum + '</dl>';
}

module.exports.run = run;

