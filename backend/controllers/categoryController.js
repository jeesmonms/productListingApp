import { Category } from "../model/categoryModel.js";

//create new category
export const createCategory = async (request, response) => {
  console.log(request.body);
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: "Send required fields",
      });
    }

    const exists = await Category.findOne({ name: request.body.name });

    if (exists) {
      return response.json({ message: "category already exists" });
    }

    //getting details of parent category
    const res = await Category.findOne({ name: request.body.parentCategory });
    console.log(res);

    let paths;
    res
      ? (paths = [...res.parentPath, request.body.parentCategory])
      : (paths = [request.body.parentCategory]);

    const newCategory = {
      name: request.body.name,
      parentPath: paths,
    };

    const category = await Category.create(newCategory);

    return response.status(201).send(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//get all categories
export const getCategories = async (req, res) => {
  try {
    const response = await Category.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};
