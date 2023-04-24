const inflector = require("./Inflect");

function getController(controller, req, res) {
    try {
        let className = '../controllers/' + inflector.capitalize(controller) + 'Controller';
        return require(className);
    } catch (e) {
        console.log(e);
        return false;
    }
};

function contentIsJson(req) {
    return req.header('content-type') === 'application/json'
        && req.body instanceof Object;
}

module.exports.contentIsJson = contentIsJson;
module.exports.getController = getController;