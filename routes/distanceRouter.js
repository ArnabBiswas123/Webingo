const express = require('express');
const router = express.Router()

const distance=require('../controller/distance');

router.post('/getHundredmeterUsers',distance);



module.exports=router