const express = require('express');
const router = express.Router();
const utilities = require("../utility/Routes");
const {AppError} = require("../exceptions/AppError");


function edit(req, res) {
    let controller = utilities.getApiController(req, res);
    if (!controller) return res.status(404).send(`${req.params.controller} could not be found`);
    if (!utilities.contentIsJson(req)) return res.status(400).send("Request body must be 'application/json");

    let result = controller.edit(req.params.id, req.body);
    if (!result) return res.status(404).send(`The requested '${req.params.controller}' record could not be found`);

    return res.status(200).send(result);
}

/**
 * auth
 */
router.post('/auth', async (req, res) => {
    try {
        let controller = utilities.getNamedController('api/Users', req, res);
        let token = await controller.auth(req.body);
        return res.header('x-auth-token', token).status(200).send(token);
    } catch (e) {
        return res.status(e.status ?? 500).send(e.toString());
    }
})

/**
 * index / get a page of records
 *
 * @return {Response}
 */
router.get('/:controller', async (req, res) => {
    try {
        let controller = utilities.getApiController(req, res);
        return res.send(await controller.index());
    }
    catch (e) {
        return res.status(e.status ?? 500).send(e);
    }
})

/**
 * view / get a record by id
 *
 * @return {Response}
 */
router.get('/:controller/:id', async (req, res) => {
    try {
        let controller = utilities.getApiController(req, res);
        return res.status(200).send(await controller.view(req.params.id));
    } catch (e) {
        return res.status(e.status ?? 500).send(e);
    }
})

/**
 * add
 */
router.post('/:controller', async (req, res) => {
    try {
        let controller = utilities.getApiController(req, res);
        return res.status(200).send(await controller.add(req.body));
    } catch (e) {
        return res.status(e.status ?? 500).send(e);
    }
})

async function apiPatchPutHandler(req, res) {
    try {
        let controller = utilities.getApiController(req, res);
        return res.status(200).send(await controller.edit(req.params.id, req.body));
    } catch (e) {
        return res.status(e.status ?? 500).send(e);
    }
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
router.delete('/:controller/:id', async (req, res) => {
    try {
        let controller = utilities.getApiController(req, res);
        return res.status(200).send(await controller.delete(req.params.id));
    } catch (e) {
        return res.status(e.status ?? 500).send(e);
    }
})

module.exports = router;