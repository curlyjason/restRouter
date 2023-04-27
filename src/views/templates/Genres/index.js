
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let accum = '';
    let genres = await this.genres;
    for(let i = 0; i < genres.length; i++) {
        console.log(genres[i]);
        accum += Html.table(genres[i]);
    }

    return accum;
}

module.exports.run = run;