const { json } = require('body-parser');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}
const States = require('../model/config/States');

const verifyStateCode = require('../middleware/verifyStateCode');

const getAllStates = async (req, res) => {

    contigExists = req.query.contig;

    let jsonStates;

    if(contigExists === 'false'){

         jsonStates = data.states.filter(element => element.code === 'AK' || element.code === 'HI');


    }
    else if(contigExists === 'true'){

        jsonStates = data.states.filter(element => element.admission_number < 49);

    }

   else{

        jsonStates = data.states;
   }
   
    
    const states = await States.find();

   //const states = await States.findOne({stateCode:'OK'}, 'funfacts');
    if (!states || !jsonStates) return res.status(204).json({ 'message': 'No states found' });
   
    //take the json data and loop through it to find the first item 

    const newArr = []

    jsonStates.forEach((item) =>{
    
    
    const checkState = states.find(element => element.stateCode === item.code);
    if(!checkState){

    item.funfacts = [];
    }
    else{

    item.funfacts = checkState.funfacts;

    }

    newArr.push(item);
    
    
    });
    
    res.json(newArr);

   
}
//Create Update and Delete are MongoDB

const createNewFunFact = async (req, res) =>  {

    const funfacts = req.body;
    console.log(req.body);

    try {
        //create and store new funfact
    
        const result = await States.create({
            
            "stateCode": req.params.state,
            "funfacts": req.body.funfacts
    
        });
    
        console.log(result);
    
    
        res.status(201).json({ 'success': `New fun fact created for State Code: ${code}`});
    } catch (err){
    
        res.status(500).json({'message': err.message });
    }
    
    }


//Json Data and MongoDB
const getState = async (req, res) => {

    const states = await States.find();

    const state = data.states.find(st => st.code === req.params.state.toUpperCase()); 
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
    }

    const checkState = states.find(element => element.stateCode === state.code);
  
    if(!checkState){

    state.funfacts = [];
    }
    else{

    state.funfacts = checkState.funfacts;
    }
   
    res.json(state);

}

const getStateCapital = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
    }

    res.json({'state': `${state.state}`, 'capital': `${state.capital_city}`});
}

const getStateNickName = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
    }

    res.json({'state': `${state.state}`, 'nickname': `${state.nickname}`});
}

const getStatePopulation = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
    }

    res.json({'state': `${state.state}`, 'population': `${state.population}`});
}
const getStateAdmission = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
    }

    res.json({'state': `${state.state}`, 'admitted': `${state.admission_date}`});
}





module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickName,
    getStatePopulation,
    getStateAdmission,
    createNewFunFact
}
