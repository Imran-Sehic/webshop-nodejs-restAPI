const express = require('express');
const router = express.Router();
const Product = require('../model/product');

let ObjectID = require("mongodb").ObjectID;

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const product = await Product.findOne({ _id: ObjectID(req.params.id) });
        res.send(product);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const product = new Product({
        _id: new ObjectID(),
        name: req.body.name,
        description: req.body.description
    })

    try{
        await product.save();
        res.status(201).json({ message: 'object saved to db' });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/', async (req, res) => {
    try{
        await Product.updateOne(
            { _id: ObjectID(req.body._id) }, 
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                }
            }
        )
        res.status(200).json({ message: 'product updated' });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await Product.deleteOne({ _id: ObjectID(req.params.id) });
        res.status(200).json({ message : 'object deleted' })
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;