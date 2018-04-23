const express = require('express');

const router = express.Router();

const Product = require('../models/product');

const mongoose = require('mongoose')

router.get('/', (req, res, next) =>
{
	Product.find()
	.exec()
	.then(docs =>{
		console.log(docs);
		res.status(200).json(docs)
	})
	.catch(err =>{
		console.log(err);
		res.status(500);
	});	

});

router.post('/', (req, res, next) =>
{
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	});
	product.save().then(result => {
		console.log(result);
	});
	res.status(200).json({
		message : 'Handling POST requests from /products'
	});	

});

router.get('/:productId', (req, res, next) =>
{
	const id = req.params.productId;
	Product.findById(id)
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if(doc)
		{
			res.status(200).json(doc);
		}
		else
		{
			res.status(404).json({messgae: 'No valid entery found'})
		}
	});	

});

module.exports = router;