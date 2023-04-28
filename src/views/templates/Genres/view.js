const Html = require('../../helpers/HtmlHelper');

async function run() {
    let genre = await this.genre;
    let accum = '<dl>';

    for(let i = 0; i < this.allowedKeys.length; i++) {
        accum += `<dt>${this.allowedKeys[i]}</dt>
            <dd>${genre[this.allowedKeys[i]]}</dd>`
    }

    return accum + '</dl>';
}

module.exports.run = run;

