import { Route, Routes } from "react-router-dom";
import ProductsList from "./components/ProductList/ProductsList";
import ProductPage from "./components/ProductPage/ProductPage";
import CreateProduct from "./components/CreateProduct/CreateProduct";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="head__title">Products List</h1>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;