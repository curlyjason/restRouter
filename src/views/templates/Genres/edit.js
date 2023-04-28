
const Form = require('../../helpers/FormHelper');
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let genre = await this.genre;
    let accum = '';

    accum += Form.create(genre, `/genres/edit/${genre._id}`, {method: 'PATCH'});
    accum += Form.submit();
    accum += Form.end();

    return accum;
}

module.exports.run = run;
