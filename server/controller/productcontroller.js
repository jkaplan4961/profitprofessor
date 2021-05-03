const router = require('express').Router();
const validateSession = require("../middleware/validate-session");
const Product = require('../db').import('../models/product');


router.get('/',validateSession, function(req,res){
    Product.findAll()
        .then((allProducts) => res.status(200).json(allProducts))
        .catch((err) => res.status(500).json({error:err}))
})

router.post('/filter', function(req,res){
    let {userId,vendorId,marketplaceId}=req.body
    const searchFilters = {
        userId:userId
    }

    if(vendorId) searchFilters.vendorId = vendorId
    if(marketplaceId) searchFilters.marketplaceId = marketplaceId
    Product.findAll({
        where: searchFilters
    })
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(500).json({error:err}))
})

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
        image:req.body.image,
        cost:req.body.cost,
        price:req.body.price,
        userId:req.body.userId,
        vendorId:req.body.vendorId,
        marketplaceId:req.body.marketplaceId

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