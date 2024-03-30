import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/auth" />
          <Route path="/checkout" />
          <Route path="/purchased-items" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
