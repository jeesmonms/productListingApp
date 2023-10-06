import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import ErrorPage from "./pages/ErrorPage";

// layouts
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="addcategory" element={<AddCategory />} />
      <Route path="addproduct" element={<AddProduct />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
