
const Html = require('../../helpers/HtmlHelper');

console.log(Html)

async function run() {
    let accum =
        Html.p(this.one)
        + Html.p(this.two)
        + Html.p(this.three)
        /*+ Html.propertiesToUL(this.genres)*/;

    return accum;
}

module.exports.run = run;