const { json } = require('body-parser');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}
const States = require('../model/config/States');

const getAllStates = async (req, res) => {

    if(req.params.contig === false){

        const jsonStates = data.states.find(con => con.state === 'AL');


    }
    else if(req.params.contig === true){

        const jsonStates = data.states.find(con => con.state === 'CA' );
    }
    
    const jsonStates = data.states;


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
//Not sure why these aren't working 
const getAllContigStates = (req, res) => {

    const contigStates = data.states.filter((st) =>{return st.admission_number === parseInt(50)});
    res.json(contigStates);
} 

const getAllNonContigStates = (req, res) => {

    const nonContigStates = data.states.filter((st) => {return st.admission_number === 50 || 49});
    res.json(nonContigStates);
}


const createNewFunFact = async (req, res) =>  {

    try {
        //create and store new funfact
    
        const result = await State.create({
            
            "stateCode": req.body.stateCode,
            "funfacts": req.body.funfacts
    
        });
    
        console.log(result);
    
    
        res.status(201).json({ 'success': `New fun fact created for State Code: ${code}`});
    } catch (err){
    
        res.status(500).json({'message': err.message });
    }
    
    }



module.exports = {
    getAllStates,
    getState,
    getStateCapital,
    getStateNickName,
    getStatePopulation,
    getStateAdmission,
    getAllContigStates,
    getAllNonContigStates,
    createNewFunFact
}
