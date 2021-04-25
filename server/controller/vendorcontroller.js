const router = require('express').Router();
const validateSession = require("../middleware/validate-session");
const Vendor = require('../db').import('../models/vendor');


router.get('/',validateSession, function(req,res){
    Vendor.findAll()
        .then((allVendors) => res.status(200).json(allVendors))
        .catch((err) => res.status(500).json({error:err}))
})

router.get('/company/:company', function(req,res){
    let company=req.params.company
    Vendor.findOne({company: company})
        .then((company) => res.status(200).json(company))
        .catch((err) => res.status(500).json({error:err}))
})

//CREATE A Vendor - vendor/create
router.post('/create',validateSession, function (req, res) {
    const vendorDetails = {
        company:req.body.company,
        address:req.body?.address,
        city:req.body?.city,
        state:req.body?.state,
        zip:req.body?.zip,
        phone:req.body?.phone,
        cost:req.body?.cost
    }
    Vendor.create(vendorDetails)
    .then(vendorDetails => res.status(200).json(vendorDetails))   
    .catch(err => res.status(500).json({error:err}))
});

module.exports = router;