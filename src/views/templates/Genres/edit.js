
const Form = require('../../helpers/FormHelper');
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let genre = await this.genre;
    let accum = '';

    accum += Form.create(genre, `/genres/edit/${genre._id}`, {method: 'post'});
    accum += '<input ' +
        'type="text" ' +
        'name="name" ' +
        'required="required" ' +
        'data-validity-message="This field cannot be left empty" ' +
        'oninvalid="this.setCustomValidity(\'\'); ' +
        'if (!this.value) this.setCustomValidity(this.dataset.validityMessage)" ' +
        'oninput="this.setCustomValidity(\'\')" ' +
        'id="name" ' +
        `value="${genre.name}" ` +
        'maxlength="100">'
    accum += Form.submit();
    accum += Form.end();

    return accum;
}

module.exports.run = run;
