const router = require("express").Router();

const ProductModel = require("../model/product");
const Upload = require("../config/common/upload");
const {Types} = require("mongoose");
const mongoose = require("mongoose");
//GET ALL METHOD
router.get('/get-all', async (req, res) => {
    try {
        const data = await ProductModel.find();
        res.send(data)
    } catch (err) {
        res.json({
            "status": 400,
        });
        console.log("Failed to create category : " + err)
    }

})
//GET BY ID
router.get('/get-by/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = await ProductModel.findById(id).populate('id_category')

        res.json({
            "status": 200,
            "data": data
        })
    } catch (err) {
        res.json({
            "status": 400,
        })
    }
})

//GET BY CATEGORY ID
router.get('/get-by-category/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const data = await ProductModel.find({id_category:id})
        res.send(data)
    }catch (err){

    }
})
//GET BY NAME
router.get('/get-by-name', async (req, res) => {
    try{
        const {name} = req.query;
        const regex = new RegExp(name, 'i'); // 'i' flag for case insensitivity
        const data = await ProductModel.find({ name: { $regex: regex } });

        res.send(data)
    }catch (err){
        res.json({
            "status": 400,
            "message":"Failed to create category : "
        })
        console.log("Failed to create category : " + err)
    }
})
// POST METHOD

router.post('/create', Upload.single('image'), async (req, res) => {
    try {
        const data = req.body;


        const {file} = req;
        const urlsImage = `/uploads/${file.filename}`;
        const newProduct = new ProductModel({
            name: data.name,
            description: data.description,
            image: urlsImage,
            price: data.price,
        })
        const result = await newProduct.save()
        if (result) {
            res.json({
                "status": 200,
                "data": result
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            "status": 400
        })
    }
})
//DELETE METHOD
router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = ProductModel.findByIdAndDelete(id)
        res.json({
            "status": 200,
            "message": "Product deleted successfully."
        })
    } catch (err) {
        console.log("Failed to delete category : " + err)
    }
})
//UPDATE METHOD
router.put('/update/:id', Upload.single('image'), async (req, res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const prod = await ProductModel.findById(id)
        const {files} = req;
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        let result = null
        if (prod) {
            prod.name = data.name ?? prod.name
            prod.description = data.description ?? prod.description
            prod.image = urlsImage ?? prod.image
            prod.price = data.price ?? prod.price
            prod.id_category = data.id_category ?? prod.id_category
        }
        result = await prod.save()
        res.json({
            "status" :200,
            "data" : result
        })

    }catch (err){
        res.json({
            "status" :400,
            "message" : "Failed to update category"
        })
        console.log("Failed to update category : " + err)
    }



})
module.exports = router;