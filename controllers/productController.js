const productModel = require("../models/productModel");
const cloudinary = require("../config/cloudinary");

//GetProduct
exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const query = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const totalProducts = await productModel.countDocuments(query);

    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get single Product
exports.getSingleProducts = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// ================== CREATE PRODUCT ==================
exports.createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "products" }
      );

      imageUrl = uploadResult.secure_url;
    }

    const product = await productModel.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: imageUrl,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================== UPDATE PRODUCT ==================
exports.updateProduct = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "products" }
      );

      updatedData.image = uploadResult.secure_url;
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================== DELETE PRODUCT ==================
exports.deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
