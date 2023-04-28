
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let genres = await this.genres;
    let accum = `
<table>
    <tbody>
        ${Html.tHeaders(this.allowedKeys)}`;

        for(let i = 0; i < genres.length; i++) {
            accum += Html.tCells(
                genres[i],
                this.allowedKeys,
                {
                    _id: (obj) => {return Html.link(obj._id, `view/${obj._id}`)}
                }
            );
        }

    return accum + `
    </tbody>
</table>
`;
}

module.exports.run = run;