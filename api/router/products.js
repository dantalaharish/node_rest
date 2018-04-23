const express = require('express');

const router = express.Router();

const Product = require('../models/product');

const mongoose = require('mongoose')

router.get('/', (req, res, next) =>
{
	res.status(200).json({
		message : 'Handling GET requests from /products'
	})	

});

router.post('/', (req, res, next) =>
{
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	});
	product.save().exec();
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
		res.status(200).json(doc);
	});	

});

module.exports = router;