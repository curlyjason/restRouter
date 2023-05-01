
const Form = require('../../helpers/FormHelper');
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let movie = await this.movie;
    let genres = await this.genres;
    let accum = '';

    accum += '<fieldset>';
    accum += Form.create(movie, `/movies/add/`, {method: 'post'});
    accum += '<input ' +
        'type="text" ' +
        'name="name" ' +
        'required="required" ' +
        'data-validity-message="This field cannot be left empty" ' +
        'oninvalid="this.setCustomValidity(\'\'); ' +
        'if (!this.value) this.setCustomValidity(this.dataset.validityMessage)" ' +
        'oninput="this.setCustomValidity(\'\')" ' +
        'id="name" ' +
        `value="" ` +
        'maxlength="100">'
    accum += '<br/>';
    accum += Form.checkboxes('genres', genres);
    accum += '</fieldset>';
    accum += Form.submit();
    accum += Form.end();

    return accum;
}

module.exports.run = run;
