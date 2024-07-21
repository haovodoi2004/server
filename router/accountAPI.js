const express = require('express')
const router = express.Router()
const Account = require('../model/account')

const Upload = require("../config/common/upload");
//GET by ID
router.get('/get-byId/:id', async (req, res) => {
    try{
        const {id} = req.params
        const data = await Account.findById(id)
        res.json({
            "status": 200,
            "data": data
        })
    }catch (err){
        console.log("Failed to find account with id : " + err)
    }

})
//GET check login
router.get('/get-login-data', async (req, res) => {
    try {
        const {email, password} = req.query
        const data = await Account.findOne({Email: email, Password: password})
        res.json({
            "status": 200,
            "isLogin": true,
            "ID": data._id
        })
    } catch (err) {
        res.json({
            "status": 400,
            "isLogin": false,
            "message": "Failed to get login data"
        })
        console.log("Failed to get login data :" + err)
    }
})
//PORT
router.post('/signup', Upload.single('image'), async (req, res) => {
    const data = req.body;
    const {file} = req;
    const urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    const checkIsHave = await Account.find({Email : data.email , Password: data.password})
    if (!checkIsHave){
        const newAccount = new Account({
            Email: data.email,
            Password: data.password,
            FullName: data.Name,
            Image: urlsImage
        })
        const result =await newAccount.save()
        if (result) {
            res.json({
                "status": 200,
                "data": result
            })
        } else {
            res.json({"status": 400, "message": "Failed to get account data"})
        }
    }else {
        res.json({"status": 400, "message": "Account is have"})
    }

})
//PUT
router.put('/update/:id', Upload.single('image'),async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const {file} = req;
    const urlsImage = `/uploads/${file.filename}`;
    const account = await Account.findById(id)
    if (account){
        account.Email = data.email ?? account.Email
        account.Password = data.password ?? account.Password
        account.Image = urlsImage ?? account.Image
    }
    let result = null
    result = await account.save()
    if (result){
        res.json({
            "status" : 200,
            "data" : account
        })
    }
})
module.exports = router