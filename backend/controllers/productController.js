import { Product } from "../model/productModel.js";
import { Category } from "../model/categoryModel.js";

//add new product
export const createProduct = async (request, response) => {
  try {
    if (
      !request.body.productName ||
      !request.body.description ||
      !request.body.price ||
      !request.body.dropdownInput
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const res = await Category.findOne({ name: request.body.dropdownInput });
    console.log(">>>>>res", res);

    let paths = [...res.parentPath, request.body.dropdownInput];

    const newProduct = {
      productName: request.body.productName,
      description: request.body.description,
      price: request.body.price,
      categories: paths,
    };
    console.log(">>>>>newProduct", newProduct);

    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//get all products
export const getProducts = async (req, res) => {
  try {
    const response = await Product.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

//getProductsByCategory
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    const response = await Product.find({ categories: category });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};
