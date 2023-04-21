const express = require('express');
const router = express.Router();
const inflector = require("../utility/Inflect");

function getController(controller, req, res) {
    try {
        let className = '../controllers/api/' + inflector.capitalize(controller) + 'Controller';
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

function edit(req, res) {
    let controller = getController(req.params.controller);
    if (!controller) return res.status(404).send(`${req.params.controller} could not be found`);
    if (!contentIsJson(req)) return res.status(400).send("Request body must be 'application/json");

    let result = controller.edit(req.params.id, req.body);
    if (!result) return res.status(404).send(`The requested '${req.params.controller}' record could not be found`);

    return res.status(200).send(result);
}

/**
 * index
 */
router.get('/:controller', async (req, res) => {
    let controller = getController(req.params.controller);
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    return res.send(await controller.index());
})

/**
 * view
 */
router.get('/:controller/:id', async (req, res) => {
    let controller = getController(req.params.controller);
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    let result = await controller.view(req.params.id);
    if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);

    return res.status(200).send(result);
})

/**
 * add
 */
router.post('/:controller', async (req, res) => {
    let controller = getController(req.params.controller);
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    let result = await controller.add(req.body);
    if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);

    return res.status(200).send(result);
})

async function apiPatchPutHandler(req, res) {
    let controller = getController(req.params.controller);
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    let result = await controller.edit(req.params.id, req.body);
    if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);

    return res.status(200).send(result);
}

/**
 * edit
 */
router.patch('/:controller/:id', apiPatchPutHandler)

/**
 * edit
 */
router.put('/:controller/:id',  apiPatchPutHandler)

/**
 * delete
 */
router.delete('/:controller/:id', (req, res) => {
    let controller = getController(req.params.controller);
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    let result = controller.delete(req.params.id);
    if (!result) return res.status(404).send(`The requested '${req.params.controller}' record could not be found`);

    return res.status(200).send(result);
})

module.exports = router;