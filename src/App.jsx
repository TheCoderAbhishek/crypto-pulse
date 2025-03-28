import React from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow py-8 px-4">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}

export default App;
