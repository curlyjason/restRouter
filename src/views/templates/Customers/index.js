
const Html = require('../../helpers/HtmlHelper');

function getViewLink() {
    return (obj) => {
        return Html.link(obj._id, `/customers/view/${obj._id}`)
    };
}

async function run() {
    let customers = await this.customers;
    let accum = `

${Html.link('New customer', 'add/')}

<table>
    <tbody>
        ${Html.tHeaders(this.allowedKeys)}`;

        for(let i = 0; i < customers.length; i++) {
            accum += Html.tCells(
                customers[i],
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