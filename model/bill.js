const mongoose = require('mongoose');
const Schema = mongoose.Schema

const billSchema = new Schema({
    Date:{type:Date,default:Date.now},
    Email:{type:String,ref:'account'},
},{
    timestamps:true
})
module.exports = mongoose.model('bill',billSchema)