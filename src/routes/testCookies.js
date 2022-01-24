const router = require('express').Router();


router.get('/set-cookies', (req, res) => {
    try {
        
        res.cookie('newuser', 'new falue');
        res.send('hookie');
    } catch (error) {
        console.log(error);
    }
})

router.get('/get-cookies', (req, res) => {
    try {
        const cookies = req.cookies;
        console.log(cookies);

        res.json(cookies);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;