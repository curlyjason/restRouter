const inflector = require("./Inflect");

function getApiController(controller) {
    try {
        let classPath = '../controllers/api/' + inflector.capitalize(controller) + 'Controller';
        return new (require(classPath))();
    } catch (e) {
        console.log(e);
        return false;
    }
};

function getMVCController(controller) {
    try {
        let classPath = '../controllers/' + inflector.capitalize(controller) + 'Controller';
        return new (require(classPath))();
    } catch (e) {
        console.log(e);
        return false;
    }
};

function contentIsJson(req) {
    return req.header('content-type') === 'application/json'
        && req.body instanceof Object;
}

function actionExists(controller, action) {
    return typeof controller[action] === 'function';
}

function parsePassedArgs(req) {
    if (req.params[0] === undefined) {req.params[0] = ''}
    req.pass = req.params[0].split('/');
}

module.exports.contentIsJson = contentIsJson;
module.exports.getApiController = getApiController;
module.exports.getMVCController = getMVCController;
module.exports.actionExists = actionExists;
module.exports.parsePassedArgs = parsePassedArgs;