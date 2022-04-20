const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

//All state data returned
router.route('/')
    .get(statesController.getAllStates);


//All data for the state URL parameter
router.route('/:state')
    .get(statesController.getState);


//State Capital

 router.route('/:state/capital')
    .get(statesController.getStateCapital);

//State Nickname

router.route('/:state/nickname')
.get(statesController.getStateNickName);

//State Population

router.route('/:state/population')
.get(statesController.getStatePopulation);

//State Nickname

router.route('/:state/admission')
.get(statesController.getStateAdmission);

//All state data for contiguous states (Not AK or HI)
router.route('/?contig=true')
    .get(statesController.getAllContigStates);

//All state data for non-contiguous states (AK, HI)

router.route('/?contig=false')
    .get(statesController.getAllNonContigStates);
   

//A random fun fact for the state URL
router.route('/:state/funfact')
    .get();

//Post, Patch, Delete requests
router.route('/:state/funfact')
    .post()
    .patch()
    .delete()

module.exports = router;
