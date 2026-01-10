const productModel = require("../models/productModel")

exports.getProducts = async (req, res) => {
  try {
    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Search
    const query = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // Count total products (after search)
    const totalProducts = await productModel.countDocuments(query);

    // Get paginated products
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleProducts = async(req, res)=>{

    try {
        const product = await productModel.findById(req.params.id)
    res.json({
        success:true,
        product
    })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

exports.createProduct = async (req, res) => {
  const product = await productModel.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  });

  res.status(201).json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
  const updatedData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };

  if (req.file) {
    updatedData.image = `/uploads/${req.file.filename}`;
  }

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json({ success: true, product });
};


exports.deleteProduct = async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Product deleted" });
};