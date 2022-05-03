const { json } = require('body-parser');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}
const States = require('../model/config/States');

const verifyStateCode = require('../middleware/verifyStateCode');
const req = require('express/lib/request');
const res = require('express/lib/response');

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

    }
    else{

    item.funfacts = checkState.funfacts;

    }

    newArr.push(item);
    
    
    });
    
    res.json(newArr);

   
}
//Create MongoDB funfact(s)

const createNewFunFact = async (req, res) =>  {

    const { funfacts } = req.body;

    if(!funfacts) return res.status(400).json({'message': 'State fun facts value required'});

    else if(!Array.isArray(funfacts)) return res.status(400).json({'message': 'State fun facts value must be an array'});


    const duplicate = await States.findOne({stateCode: req.params.state}).exec();
    if(duplicate)
    {
        try {

            const result = await States.updateOne(
                
            {   stateCode: req.params.state },

            {$push: {funfacts: funfacts}  },
        
            );
            
            res.status(201).json(result);
   

        }
        catch (err){
    
            res.status(500).json({'message': err.message });
        }

    }
    else{

    try {
        //create and store new funfact
    
        const result = await States.create({
            
            "stateCode": req.params.state,
            "funfacts": funfacts
    
        });
    
        
    
    
        res.status(201).json(result);
    } catch (err){
    
        res.status(500).json({'message': err.message });
    }
    }
    
    }

//Update MongoDB

const updateExistingFunfacts = async (req, res) => {
   

const { index, funfact } = req.body;

const stateNM = data.states.find(st => st.code === req.params.state.toUpperCase()); 
  

const state = await States.findOne({stateCode: `${req.params.state.toUpperCase()}`}); 

const checkIndex = state.funfacts[index-1];

if(!index) return res.status(400).json({'message': 'State fun fact index value required'});

else if(!funfact || typeof funfact != 'string') return res.status(400).json({'message': 'State fun fact value required'});

else if(!state) return res.status(400).json({"message": `No Fun Facts found for ${stateNM.state}`});
  
else if(!checkIndex) return res.status(400).json({"message": `No Fun Fact found at that index for ${stateNM.state}`}); 

else {

  state.funfacts[index-1] = funfact;

 // console.log(state.funfacts[index-1]);
  const result = await state.save();

  res.json(result);

}

}

//Delete MongoDB Not working Need to solve 
const deleteFunfact = async (req, res) => {

const { index } = req.body;

const state = await States.findOne({stateCode: `${req.params.state.toUpperCase()}`}); 

const checkIndex = state.funfacts[index];

if(!index) return res.status(400).json({'message': 'Index of Funfact Required'});

else if(!state) return res.status(400).json({"message": `State Code ${req.params.state.toUpperCase()} not found`});
  
else if(!checkIndex) return res.status(400).json({"message": `Funfact Index not found`}); 


else{

    const result = await States.updateOne({stateCode: req.params.state}, {

        $pull: {
            funfacts: checkIndex
        }
    });

    res.json(result);
}


}

//Json Data and MongoDB
const getState = async (req, res) => {

    const states = await States.find();

    const state = data.states.find(st => st.code === req.params.state.toUpperCase()); 
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
    }

    const checkState = states.find(element => element.stateCode === state.code);
  
    if(!checkState){

    }
    else{

    state.funfacts = checkState.funfacts;
    }
   
    res.json(state);

}

const getRandomFunfact = async (req, res) => {


    const states = await States.find();

    const state = data.states.find(st => st.code === req.params.state.toUpperCase()); 
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
   }

    const checkState = states.find(element => element.stateCode === state.code);
  
    if(!checkState){

        return res.status(400).json({"message": `No Fun Facts found for ${state.state}`});
   
    }
    

    randArr = checkState.funfacts[Math.floor(Math.random()*checkState.funfacts.length)];
    
   
    res.json({'funfact' : `${randArr}`});

    

}




const getStateCapital = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
    }

    res.json({'state': `${state.state}`, 'capital': `${state.capital_city}`});
}

const getStateNickName = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
    }

    res.json({'state': `${state.state}`, 'nickname': `${state.nickname}`});
}

const getStatePopulation = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
    }

    res.json({'state': `${state.state}`, 'population': `${state.population.toLocaleString()}`});
}
const getStateAdmission = (req, res) => {

    const state = data.states.find(st => st.code === req.params.state.toUpperCase());
    if(!state) {
        return res.status(400).json({"message": `Invalid state abbreviation parameter`});
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
    createNewFunFact,
    updateExistingFunfacts,
    deleteFunfact,
    getRandomFunfact
}
