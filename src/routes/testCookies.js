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

router.get('/destroy-cookies', (req, res) => {
    try {
        console.log(req.cookies);
        // res.clearCookie("access-token");
        // res.clearCookie("newuser");
        res.status(200).clearCookie("access-token").send("cookie deleted");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;