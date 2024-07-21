const router = require("express").Router();

const CategoryModel = require("../model/category");
//GET METHOD
router.get('/get-all' ,async (req,res)=>{
    try{
        const data = await CategoryModel.find()
        res.json({
            "status": 200,
            "data": data
        })
    }catch (err){
        res.json({
            "status": 400
        })
        console.log(err)
    }
})
//POST METHOD
router.post('/create',async (req,res)=>{
    try{
        const data = req.body;
        const newCategory = new CategoryModel({
            name:data.name,
        })
        const result = await newCategory.save()
        if (result){
            res.json({
                "status": 200,
                "data": result
            })
        }else {
            res.json({
                "status": 400,
            })
        }
    }catch (err){
        console.log("Failed to create category : " + err)
    }
})
module.exports = router