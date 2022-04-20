const { json } = require('body-parser');

//const StateCode = require('../model/config/States');
const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}

const getallStates = (req, res) => {

    req.json(data.states);
}
//Create Update and Delete are MongoDB


//Json Data and MongoDB(add later)
const getState = (req, res) => {

    const state = data.states.find(st => st.code === JSON.stringify(req.params.code));
    if(!state) {
        return res.status(400).json({"message": `State Code ${req.params.code} not found`});
    }
    res.json(state);
}

module.exports = {
    getAllStates,
    getState
}
