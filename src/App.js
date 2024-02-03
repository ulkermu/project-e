import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Card from "./pages/Card";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Product />} />
        <Route exact path="/product" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
