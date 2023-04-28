
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

module.exports = {create, end, submit}