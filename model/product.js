const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    name :{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    id_category:{type:Schema.Types.ObjectId,ref :'category'},
},{
    timestamps: true
})

module.exports = mongoose.model('product',productSchema)

