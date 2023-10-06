import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [textInput, setTextInput] = useState("");
  const [dropdownInput, setDropdownInput] = useState("");

  const navigate = useNavigate();

  const [categories, setCategories] = useState(["No Parent Category"]);

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
      await axios.post("http://localhost:4000/category", {
        name: textInput,
        parentCategory: dropdownInput,
      });
      alert("New Category Added!");
      navigate("/addproduct");
    } catch (error) {
      console.error(error);
    }
    console.log("Form data submitted:", textInput, dropdownInput);
  };
  return (
    <div className="container">
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Category Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="textInput"
            name="textInput"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dropdownInput" className="form-label">
            Select Parent Category:
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

export default AddCategory;
