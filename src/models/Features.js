const mongoose = require('mongoose');


const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});



module.exports = mongoose.model('features', featureSchema);
