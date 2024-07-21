const mongoose = require("mongoose");
const {model} = require("mongoose");
const Schema = mongoose.Schema

const accountSchema = new Schema({
    Email :{type:String},
    Password:{type:String},
    FullName:{type:String},
    Image:{type:String}
},{
    timestamps: true
})

module.exports = mongoose.model('account',accountSchema)

