const router = require('express').Router();
const validateSession = require("../middleware/validate-session");
const Product = require('../db').import('../models/product');


router.get('/',validateSession, function(req,res){
    Product.findAll()
        .then((allProducts) => res.status(200).json(allProducts))
        .catch((err) => res.status(500).json({error:err}))
})

// router.get('/name/name', function(req,res){
//     let product=req.params.product
//     Product.findOne({name:name})
//         .then((product) => res.status(200).json(product))
//         .catch((err) => res.status(500).json({error:err}))
// })

//CREATE A Products - product/create
router.post('/create', function (req, res) {
    const ProductEntry ={
        name:req.body.name,
        description:req.body.description,
        manufacturer:req.body.manufacturer,
        upc:req.body.upc,
        part_num:req.body.part_num,
        packaging:req.body.packaging,
        shipping_cost:req.body.shipping_cost,
        image:req.body.image

    }
    Product.create(ProductEntry)
    .then(
        function successfulCreation(product) {            
            res.status(200).json({
                product:product,
                message: "Product Created",
            })
        }        
    )
    .catch(err => res.status(500).json({error:err}))
});

module.exports = router;