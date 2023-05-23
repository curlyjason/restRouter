const inflector = require("./Inflect");
const MissingControllerError = require("../exceptions/MissingControllerError");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*|boolean}
 */
function getApiController(req, res) {

    let controller = req.params.controller;

    try {
        let classPath = '../controllers/api/' + inflector.capitalize(controller) + 'Controller';
        return new (require(classPath))(req, res);

    } catch (e) {
        if (e.message.includes('Cannot find module')) {
            throw new MissingControllerError(`api/${controller}`, {cause: e, status: 404});
        }

        throw e;
    }
};

function getNamedController(controllerName, req, res) {
    try {
        let classPath = '../controllers/' + controllerName + 'Controller';
        return new (require(classPath))(req, res);

    } catch (e) {
        if (e.message.includes('Cannot find module')) throw new MissingControllerError(controllerName, { cause: e , status: 404});

        throw e;
    }

}

function getMVCController(req, res) {
    try {
        let classPath = '../controllers/' + inflector.capitalize(req.params.controller) + 'Controller';
        return new (require(classPath))(req, res);
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
module.exports.getNamedController = getNamedController;