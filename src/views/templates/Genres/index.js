
const Html = require('../../helpers/HtmlHelper');

function getViewLink() {
    return (obj) => {
        return Html.link(obj._id, `view/${obj._id}`)
    };
}

async function run() {
    let genres = await this.genres;
    let accum = `

${Html.link('New Genre', 'add/')}

<table>
    <tbody>
        ${Html.tHeaders(this.allowedKeys)}`;

        for(let i = 0; i < genres.length; i++) {
            accum += Html.tCells(
                genres[i],
                this.allowedKeys,
                {
                    _id: getViewLink()
                }
            );
        }

    return accum + `
    </tbody>
</table>

`;
}

module.exports.run = run;