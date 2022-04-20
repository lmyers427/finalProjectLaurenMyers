const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const stateSchema = new Schema({

    stateCode: {
        type: String,
        unique: true,
        required: true
    },
    funfacts: [String]
});

module.exports = mongoose.model('State', stateSchema);