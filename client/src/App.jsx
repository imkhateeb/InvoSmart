import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataProcess from "./pages/DataProcess";
import DataTabs from "./pages/DataTabs";
import Navbar from "./components/Navbar";

import "./index.css";
import "./App.css";
import "./assets/styles/animations.css";

function App() {
  return (
    <div className="flex flex-col bg-secondaryColor h-screen">
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <div className="h-[90vh]">
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
