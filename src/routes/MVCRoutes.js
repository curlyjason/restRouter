const express = require('express');
const router = express.Router();
const utilities = require("../utility/Routes");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:controller', async(req, res) => {
    req.params.action = req.params.action ?? 'index';

    return await routeHandler(req,res);
})

router.all('/:controller/:action', (req, res) => {
    return routeHandler(req,res);
})

router.route('/:controller/:action/*')
    .get((req, res) => {
        return routeHandler(req,res);    })
    .post((req, res) => {
        return routeHandler(req,res);
    })
    .put((req, res) => {
        return routeHandler(req,res);
    })
    .patch((req, res) => {
        return routeHandler(req,res);
    })

// router.('/:controller/:action/*', (req, res) => {
//     return routeHandler(req,res);
// })

async function routeHandler(req, res) {
    req.params.action = req.params.action ?? 'index';

    let controller = utilities.getMVCController(req, res)
    if(!controller) return res.status(404).send(`${req.params.controller} has not been created`);

    if(!utilities.actionExists(controller, req.params.action)) {
        return res.status(404).send(`${req.params.controller}.${req.params.action} has not been defined`);
    }

    utilities.parsePassedArgs(req);

    return res.status(200).send(await controller[req.params.action](...req.pass ?? []));
}

module.exports = router;