# "Lauren Myers Final Project STATES PROJECT API"

**https://lacy-adaptable-society.glitch.me/**

**Deploy by clicking the button above** 

**This is a backend rest API**
**you are able to request the following**
**( /states is to root URL parameter before the follow)**

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

//A random fun fact for the state URL
router.route('/:state/funfact')
    .get(statesController.getRandomFunfact);

 **These requests can be tested through POSTMAN or THUNDERCLIENT**

//Post, Patch, Delete requests
router.route('/:state/funfact')
    .post(statesController.createNewFunFact)
    .patch(statesController.updateExistingFunfacts)
    .delete(statesController.deleteFunfact)
