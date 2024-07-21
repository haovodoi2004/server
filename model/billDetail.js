const mongoose = require('mongoose');
const Schema = mongoose.Schema

const billDetailSchema = new Schema({
    BillID : {type:Schema.Types.ObjectId, ref:'bill'},
    ProductID: {type:Schema.Types.ObjectId, ref:'product'},
    Quantity: {type:Number, ref:'quantity'},
},{
    timestamps:true
})
module.exports = mongoose.model('billDetail',billDetailSchema)