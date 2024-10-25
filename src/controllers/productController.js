const {
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  deleteManyProduct,
  getProductById,
} = require("../services/productService");
const { validateProduct } = require("../validation/productValidation");
module.exports = {
  //Product
  postProductAPI: async (req, res) => {
    const { error } = validateProduct(req.body); // Xác thực dữ liệu
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const dataProducts = req.body;
    let result = await createProduct(dataProducts);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getProductAPI: async (req, res) => {
    let result = await getProduct(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getProductAPIbyId: async (req, res) => {
    let result = await getProductById(req.params.id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteProductAPI: async (req, res) => {
    const _id = req.body;
    let result = await deleteProduct(_id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteManyProductAPI: async (req, res) => {
    let result = await deleteManyProduct(req.body.dataDelete);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putProductAPI: async (req, res) => {
    const data = req.body;
    let result = await updateProduct(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
