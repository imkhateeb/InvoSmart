import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataProcess from "./pages/DataProcess";
import DataTabs from "./pages/DataTabs";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/data/process" element={<DataProcess />} />
          <Route path="/data/tabs" element={<DataTabs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
