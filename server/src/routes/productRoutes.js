const express = require('express');
const router = new express.Router();

const Product = require('../db/models/Product');

router.post('/', async (req, res) => {
	const product = new Product(req.body);
	try {
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.get('/', async (req, res) => {
	try {
		const product = await Product.find({});
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.get('/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const product = await Product.findById(_id);
		if (!product) return res.status(404).json({ message: 'Product not found' });
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.patch('/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['title', 'price','img'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!product) return res.status(404).json({ message: 'Product not found!' });

		res.json(product);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) res.status(404).json({ message: 'Product not found' });

		res.json(product);
	} catch (error) {
		res.status(500).json({ message: 'Bad request' });
	}
});

module.exports = router;
