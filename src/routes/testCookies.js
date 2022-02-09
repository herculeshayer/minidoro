const router = require('express').Router();

const { checkCookie, validateAuthentication } = require('./../middleware/validateCookie');

// router.get('/set-cookies', (req, res) => {
//     try {
        
//         res.cookie('newuser', 'new falue');
//         res.send('hookie');
//     } catch (error) {
//         console.log(error);
//     }
// })

router.get('/', checkCookie, (req, res) => {
    try {
        // const cookie = req.cookies['access-token'];

        
        // if(req.cookies) {
        //     // validateAuthentication(cookie);
        // } 
        if(req.cookies["access-token"]) {

            res.status(200).send("Valid Cookie");
        }
        // else {
        //     res.status(403).send("Invalid Cookie");
        // }
        // }
        // console.log(cookies);

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