
const Html = require('./HtmlHelper');

function create(context, action, options = {}) {
    return `<form 
    method="${options.method ?? 'post'}" 
    accept-charset="${options.charset ?? 'utf-8'}"  
    action="${action}">
`;
}

function end() {
    return `</form>
`;
}

function submit(label) {
    return `<input type="submit" value="${label ?? 'Submit'}">
`;
}

function checkboxes(field, options = [], selected = []) {
    let input = '';
    for (const [index, option] of options.entries()) {
        let checked = '';
        if(selected.some(({_id}) => _id.toString() === option.id)){
            checked = 'checked';
        }
        input += `<input type="checkbox" id="${field}${index}" name="${field}[]" value="${option.id}" ${checked}>
        <label htmlFor="${field}${index}">${option.name}</label><br>`
    }
    return input;
}

module.exports = {create, end, submit, checkboxes}