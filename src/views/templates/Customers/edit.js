
const Form = require('../../helpers/FormHelper');
const Html = require('../../helpers/HtmlHelper');

async function run() {
    let customer = await this.customer;
    let accum = '';

    accum += Html.p(this.error ?? '');

    accum += Form.create(customer, `/customers/edit/${customer._id}`, {method: 'post'});
    accum += `<label htmlFor="name">Name</label><br>` +
        '<input ' +
        'type="text" ' +
        'name="name" ' +
        'required="required" ' +
        'data-validity-message="This field cannot be left empty" ' +
        'oninvalid="this.setCustomValidity(\'\'); ' +
        'if (!this.value) this.setCustomValidity(this.dataset.validityMessage)" ' +
        'oninput="this.setCustomValidity(\'\')" ' +
        'id="name" ' +
        `value="${customer.name ?? ''}" ` +
        'maxlength="100">'
    accum += Form.submit();
    accum += Form.end();

    return accum;
}

module.exports.run = run;
