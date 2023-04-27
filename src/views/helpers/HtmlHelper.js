
function p(content) {
    return `<p>${content}</p>`;
}

function tCells(obj) {
    let accum = '<tr>';
    for (let value of Object.values(obj)) {
        accum += `<td>${value}</td>`;
    }
    return accum + '</tr>';
}
function tHeaders(obj) {
    let accum = '<tr>';
    for (let key of Object.keys(obj)) {
        accum += `<th>${key}</th>`;
    }
    return accum + '</tr>';
}

function tBody(obj) {
    return `<tBody>
        ${this.tHeaders(obj)}
        ${this.tCells(obj)}
        </tBody>`;
}

function table(obj) {
    return `<table>
        ${this.tBody(obj)}
    </table>`;
}

module.exports = {p, tBody, tCells, tHeaders, table};