const express = require('express');
const router = express.Router();
const container = require('../../container');


router.get('/liveness', (req, res) => {
    return res.status(200).json({response: "I'm alive"});
});

router.get('/readyness', (req, res) => {
    const dbHandler = container.resolve('mongoDbHandler');
    if (dbHandler.getInstance()) return res.status(200).json({response: "I'm ready"});
    return res.status(500).json({response: "Not ready"});
});

module.exports = router;