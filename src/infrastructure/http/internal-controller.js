const express = require('express');
const router = express.Router();
const container = require('../../container');


router.get('/liveness', (req, res) => {
    return res.status(200).json({response: "I'm alive"});
});

router.get('/readiness', (req, res) => {
    let ready = true;
    const dbHandler = container.resolve('mongoDbHandler');
    const services = [dbHandler.getInstance()];
    services.forEach((service) => {
        if (!service) {
            ready = false
        }
    });
    if (!ready) return res.status(500).json({response: "Not ready"});
    return res.status(200).json({response: "I'm ready"});

});

module.exports = router;