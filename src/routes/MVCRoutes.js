const express = require('express');
const router = express.Router();
const inflector = require("../utility/Inflect");

router.get('/:controller/:action', (req, res) => {
    return res.status(200).send([req.params, req.query, req.pass]);
})
router.get('/:controller', (req, res) => {
    req.params.action = req.params.action ?? 'index';

    return res.status(200).send([req.params, req.query, req.pass]);
})
router.get('/:controller/:action/*', (req, res) => {
    req.pass = req.params[0].split('/');
    return res.status(200).send([req.params, req.query, req.pass]);
})

async function routeHandler(req, res) {
    req.params.action = req.params.action ?? 'index';

    let controller = locateController(req)
    if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);

    let actionExists = validate(controller, req.params.action)
    if(!actionExists) return res.status(404).send(`${req.params.controller} could not be found`);

    parsePassArgs(req);


}

function parsePassArgs(req) {

}

// function getController(controller, req, res) {
//     try {
//         let className = '../controllers/' + inflector.capitalize(controller) + 'Controller';
//         return require(className);
//     } catch (e) {
//         console.log(e);
//         return false;
//     }
// };
//
// function edit(req, res) {
//     let controller = getController(req.params.controller);
//     if (!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     let result = controller.edit(req.params.id, req.body);
//     if (!result) return res.status(404).send(`The requested '${req.params.controller}' record could not be found`);
//
//     return res.status(200).send(result);
// }
//
// /**
//  * index
//  */
// router.get('/:controller', async (req, res) => {
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     return res.send(await controller.index());
// })
//
// router.get('/:controller/:action/*', async (req, res) => {
//     return res.status(200).send(req.params);
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//     let action = req.params.action;
//
//     let result = await controller[action](req.params.id, req.body);
//     if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);
//
//     return res.status(200).send(result);
//
// })
//
// /**
//  * view
//  */
// router.get('/:controller/:id', async (req, res) => {
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     let result = await controller.view(req.params.id);
//     if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);
//
//     return res.status(200).send(result);
// })
//
// /**
//  * add
//  */
// router.post('/:controller', async (req, res) => {
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     let result = await controller.add(req.body);
//     if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);
//
//     return res.status(200).send(result);
// })
//
// async function apiPatchPutHandler(req, res) {
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     let result = await controller['edit'](req.params.id, req.body);
//     if (!result) return res.status(404).send(`The requested ${req.params.controller} could not be found`);
//
//     return res.status(200).send(result);
// }
//
// /**
//  * edit
//  */
// router.patch('/:controller/:id', apiPatchPutHandler)
//
// /**
//  * edit
//  */
// router.
// router.put('/:controller/:id',  apiPatchPutHandler)
//
// /**
//  * delete
//  */
// router.delete('/:controller/:id', (req, res) => {
//     let controller = getController(req.params.controller);
//     if(!controller) return res.status(404).send(`${req.params.controller} could not be found`);
//
//     let result = controller.delete(req.params.id);
//     if (!result) return res.status(404).send(`The requested '${req.params.controller}' record could not be found`);
//
//     return res.status(200).send(result);
// })

module.exports = router;