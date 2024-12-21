import "./App.css";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Products from "./component/Products";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
