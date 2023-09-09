const mongoose = require('mongoose');
// const Schema = mongoose.Schema

const CarSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [
            true,
            "type is required"
        ],
        minLength: [2, "Two characters at least"]
    },
    image:{
        type: String
    },
    costPerHoure:{
        type: Number
    },
    year:{
        type: Number
    },
    owner : {
        type  :  mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
} , {timestamps:true} );

Car = mongoose.model('Car', CarSchema);

module.exports = Car
