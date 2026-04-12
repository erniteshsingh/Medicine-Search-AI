import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import Response from "../pages/reponse/Response";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/result" element={<Response />} />
      <Route path="/history" element={<div>History Page Coming Soon</div>} />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
