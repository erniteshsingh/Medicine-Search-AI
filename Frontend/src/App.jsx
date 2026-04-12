import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import AppRoutes from "./routes/Approutes.jsx";

const App = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
