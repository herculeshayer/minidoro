const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    try {
        res.json({message: 'yolo'})
        res.json(req.body);
    } catch (error) {
        
    }
})

router.post('/user', (req,res) => {
    try {
        res.json(req.body)
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router;