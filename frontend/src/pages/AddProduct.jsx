import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dropdownInput, setDropdownInput] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/category");
        await setCategories(response.data);
        //console.log(response);
        //console.log("categories>>>>>>>", categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      console.log(
        "Form data submitted:",
        productName,
        description,
        price,
        dropdownInput
      );
      await axios.post("http://localhost:4000/products", {
        productName,
        description,
        price,
        dropdownInput,
      });
      alert("New Product Added!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    console.log(
      "Form data submitted:",
      productName,
      description,
      price,
      dropdownInput
    );
  };
  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dropdownInput" className="form-label">
            Select a Category:
          </label>
          <select
            className="form-select"
            id="dropdownInput"
            name="dropdownInput"
            value={categories.name}
            onChange={(e) => setDropdownInput(e.target.value)}
          >
            <option value="" selected></option>
            {categories.map((category) => (
              <option value={category.name} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
