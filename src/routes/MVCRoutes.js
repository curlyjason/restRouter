const express = require('express');
const router = express.Router();
const utilities = require("../utility/Routes");

router.get('/:controller', async(req, res) => {
    console.log(':controller');
    req.params.action = req.params.action ?? 'index';
    // console.log(routeHandler(req, res));

    return await routeHandler(req,res);
})

router.get('/:controller/:action', (req, res) => {
    return routeHandler(req,res);
})

router.get('/:controller/:action/*', (req, res) => {
    return routeHandler(req,res);
})

async function routeHandler(req, res) {
    req.params.action = req.params.action ?? 'index';

    let controller = utilities.getMVCController(req.params.controller)
    if(!controller) return res.status(404).send(`${req.params.controller} has not been created`);

    if(!utilities.actionExists(controller, req.params.action)) {
        return res.status(404).send(`${req.params.controller}.${req.params.action} has not been defined`);
    }

    utilities.parsePassedArgs(req);

    return res.status(200).send([req.params, req.query, req.pass]);
}

module.exports = router;