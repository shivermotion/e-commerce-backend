const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const userData = await User.findByPk(req.params.id);
		if (!userData) {
			res.status(404).json({
				message: "No data found!",
			});
			return;
		}
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const userData = await User.findByPk(req.params.id);
		if (!userData) {
			res.status(404).json({
				message: "No user with this id!",
			});
			return;
		}
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", (req, res) => {
	// create a new category
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	try {
		const userData = await User.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!userData[0]) {
			res.status(404).json({
				message: "No user with this id!",
			});
			return;
		}
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	try {
		const userData = await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!userData) {
			res.status(404).json({
				message: "No user with this id!",
			});
			return;
		}
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
