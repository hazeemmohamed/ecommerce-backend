const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getSingleProducts);


router.post("/products", upload.single("image"), productController.createProduct);
router.put("/products/:id", upload.single("image"), productController.updateProduct);


router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
