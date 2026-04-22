import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import Response from "../pages/reponse/Response";
import History from "../pages/history/History";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/termservice/TermsOfService";
import Contact from "../pages/contact/Contact";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/result" element={<Response />} />
      <Route path="/history" element={<History />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
