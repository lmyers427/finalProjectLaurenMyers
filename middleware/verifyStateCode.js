const { json } = require('body-parser');

const data = {

    states: require('../model/states.json'),
    setStates: function(data) {this.states = data}
}

const States = require('../model/config/States');


const verifyStateCode = (StateParam) => { 
    
    return (req, res, next) => {

        const arrStateCode = data.states.map(obj => {

            return obj.code;
        });
    

}

}