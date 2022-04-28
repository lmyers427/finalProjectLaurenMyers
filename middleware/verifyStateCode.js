const { json } = require('body-parser');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}

const States = require('../model/config/States');


const verifyStateCode = (StateParam) => { 
    
    return (req, res, next) => {

        const StateParam = req.params.state.toUpperCase();

        const arrStateCode = data.states.map(obj => {

            return obj.code;
        });
    
        const result = arrStateCode.find(el => el === StateParam);
        
}

    return result; 
}

module.exports = verifyStateCode