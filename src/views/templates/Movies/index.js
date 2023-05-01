
const Html = require('../../helpers/HtmlHelper');

function getViewLink() {
    return (obj) => {
        return Html.link(obj._id, `/movies/view/${obj._id}`)
    };
}

async function run() {
    let movies = await this.movies;
    let accum = `

${Html.link('New Genre', 'add/')}

<table>
    <tbody>
        ${Html.tHeaders(this.allowedKeys)}`;

        for(let i = 0; i < movies.length; i++) {
            accum += Html.tCells(
                movies[i],
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