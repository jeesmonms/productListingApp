import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      await setProducts(response.data);
      //console.log(response);
      // console.log("products>>>>>>>", products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductsByCategory = async (e) => {
    e.preventDefault();
    try {
      const category = e.target.value;
      // console.log(category);

      const response = await axios.get(
        `http://localhost:4000/products/${category}`
      );
      await setProducts(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <button
            className="mx-1"
            value={category.name}
            key={category._id}
            onClick={fetchProductsByCategory}
          >
            {category.name}
          </button>
        ))}
      </ul>
      <h4>Subcategories</h4>
      <h2>Products</h2>
      {products.map((product) => (
        <div className="container" key={product._id}>
          <div className="card " style={{ width: "18rem" }}>
            <img
              src="https://commitent.com/wp-content/uploads/2022/10/dmy-img.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
              <a href="#" className="btn btn-primary">
                Dummy Button
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
