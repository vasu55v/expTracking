import "./App.css";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Products from "./component/Products";
import AddProduct from "./component/AddProduct";
import Product from "./component/Product";
import EditProduct from "./component/EditProduct";
import SignUp from "./component/SignUp";
import Login from "./component/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Edit" element={<EditProduct />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
