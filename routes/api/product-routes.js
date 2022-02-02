const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
	// find all products
	// be sure to include its associated Category and Tag data
	try {
		const products = await Product.findAll({
			include: [
				{
					model: Category,
				},
				{
					model: Tag,
				},
			],
		});
		res.json(products);
	} catch (error) {
		res.status(504).json(error);
	}
});

// get one product
router.get("/:id", async (req, res) => {
	// find a single product by its `id`
	// be sure to include its associated Category and Tag data
	try {
		const productId = await Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Category,
				},
				{
					model: Tag,
				},
			],
		});
		if (productId) {
			res.json(productId);
		} else {
			res.status(404).json({
				error: "No product with this ID",
			});
		}
	} catch (error) {
		res.status(505).json(error);
	}
});

// create new product
router.post("/", async (req, res) => {
	/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
	// try {
	//   const newProduct = await Product.create({
	// //     reader_id: req.body.reader_id,
	// //   });
	// //   res.status(200).json(locationData);
	// // } catch (err) {
	// //   res.status(400).json(err);
	// }
});

// update product
router.put("/:id", async (req, res) => {
	// update product data
	try {
		const updatedProduct = await Product.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!updatedProduct[0]) {
			res.status(404).json({
				message: "No user with this id!",
			});
			return;
		}
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	// delete one product by its `id` value
	try {
		const deletedProduct = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (deletedProduct) {
			res.json(deletedProduct);
		} else {
			res.status(404).json({
				error: "No product with this Id",
			});
		}
	} catch (error) {
		res.status(506).json(error);
	}
});

module.exports = router;
