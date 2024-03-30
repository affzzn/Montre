import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

// pages
import Shop from "./pages/shop/Shop";
import Auth from "./pages/auth/Auth";
import Checkout from "./pages/checkout/Checkout";
import PurchasedItems from "./pages/purchased-items/PurchasedItems";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/purchased-items" element={<PurchasedItems />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
