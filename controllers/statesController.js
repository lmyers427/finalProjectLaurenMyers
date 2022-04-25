const { json } = require('body-parser');

const stateFunFact = require('../model/config/States');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}
const State = require('../model/config/States');

const getAllStates = (req, res) => {

    res.json(data.states);
}
//Create Update and Delete are MongoDB


//Json Data and MongoDB(add later)
const getState = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
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
