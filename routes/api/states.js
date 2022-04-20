const express = require('express');
const router = express.Router();
//const statesController = require('../../controllers/statesController');

//All state data returned
router.route('/')
    .get();


//All data for the state URL parameter
router.route('/:state')
    .get();

//All state data for contiguous states (Not AK or HI)
router.route('/:?contig=true')
    .get();

//All state data for non-contiguous states (AK, HI)

router.route('/:?contig=false')
    .get();
   

//A random fun fact for the state URL
router.route('/:state/funfact')
    .get();

//Post, Patch, Delete requests
router.route('/:state/funfact')
    .post()
    .patch()
    .delete()

module.exports = router;
