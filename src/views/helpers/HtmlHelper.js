
function p(content) {
    return `<p>${content}</p>`;
}

function tCells(obj, keys) {
    // return `<tr><td>${obj.name}</td></tr>`;
    let accum = '<tr>';

    for (let key of keys) {
        accum += `<td>${obj[key]}</td>`;
    }

    return accum + '</tr>';
}

function tHeaders(keys) {
    // return `<!--<tr><th>'name'</th></tr>-->`;
    let accum = '<tr>';
    for (let key of keys) {
        accum += `<th>${key}</th>`;
    }
    return accum + '</tr>';
}

function tBody(obj, keys) {
    return `<tBody>
        ${this.tHeaders(keys)}
        ${this.tCells(obj, keys)}
        </tBody>`;
}

function table(obj, keys) {
    // console.log(keys)
    return `<table>
        ${this.tBody(obj, keys)}
    </table>`;
}

function link(label, url) {
    return `<a href="${url}">${label}</a>`;
}

module.exports = {p, tBody, tCells, tHeaders, table};