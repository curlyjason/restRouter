
class View {

    vars = {one: 'one', two: 'two'};

    title = 'Sample Page';
    scripts = '';
    css = '';

    layout = './layouts/default.js';

    controller = null;

    constructor(config = {}) {
        this.controller = config.controller;
        this.title = `${this.controller.req.params.controller}/${this.controller.req.params.action}`;
    }

    async render(template = null) {
        template = template ?? this._defaultTemplatePath();
        let code = Object.assign(require(template), this.vars);
        // let code = require(template);
        console.log(code);
        let layout = require('./layouts/default');

        let output = layout.replace('{{title}}', this.title)
            .replace('{{scripts}}', this.scripts)
            .replace('{{css}}', this.css)
            .replace('{{content}}', await code.run());

        console.log(output);
        return output;
    }

    _defaultTemplatePath(path = null) {
        return `./templates/${this.controller.alias}/${this.controller.req.params.action}.js`;
    }

    addVars(vars) {
        this.vars = Object.assign(this.vars, vars);
    }

}

module.exports = View;