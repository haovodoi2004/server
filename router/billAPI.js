const express = require('express');
const router = express.Router();
const BillModel = require('../model/bill');
const BillDetailModel = require('../model/billDetail');
const {json} = require("express");
//GET METHOD
router.get('/get-by_userEmail', async (req, res) => {
    try {
        const {email} = req.query;
        const data = await BillModel.findOne({Email: email})
        const dataDetail = await BillDetailModel.find({BillID: data._id}).populate('ProductID')
        res.json({
            "status": 200,
            "data": data,
            "detail": dataDetail
        })
    } catch (err) {
        console.log("Failed to find category: " + err)
        res.json({"status": 400})
    }
})
//PORT METHOD
router.post('/create-bill', async (req, res) => {
    const data = req.body;
    const newBill = new BillModel({
        Email: data.Email
    })
})
router.post('/create-billDetail/', async (req, res) => {
    try {
        const data = req.body
        const newBillDetail = new BillDetailModel({
            BillID: data.billID,
            ProductID: data.prodID,
            Quantity: data.quantity
        })
        const result = newBillDetail.save()
        if (result) {
            res.json({
                "status": 200,
                "data": result
            })
        }
    } catch (err) {
        console.log("Failed to create category : " + err)
    }
})
module.exports = router;