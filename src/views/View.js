
class View {

    vars = {};

    layout = './layouts/default.js';

    controller = null;

    constructor(config = {}) {
        this.controller = config.controller;
    }

    render(template = null) {
        let template_path = template ?? this._defaultTemplatePath();
        return template_path;
    }

    _defaultTemplatePath(path = null) {
        return `./${this.controller.alias}/${this.controller.req.params.action}.js`;
    }

}

module.exports = View;