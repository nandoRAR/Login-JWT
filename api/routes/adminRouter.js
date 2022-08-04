const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/', auth, (req, res) => {

    if (req.user.admin){
        res.json({});
    }else{
        return res.status(401).json({error: 'Not Admin: Acess denied ' });
    }    
})




module.exports = router;