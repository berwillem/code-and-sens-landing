import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BootcampLayout from '../layouts/BootcampLayout';

// Bootcamp Pages
import GenerativeAIAutomation from '../pages/bootcamps/GenerativeAIAutomation';
import Ecommerce from '../pages/bootcamps/Ecommerce';
import CybersecurityBootcamp from '../pages/bootcamps/CybersecurityBootcamp';
import CybersecurityIntroduction from '../pages/bootcamps/CybersecurityIntroduction';
import PowerBI from '../pages/bootcamps/PowerBI';
import UIUXDesign from '../pages/bootcamps/UIUXDesign';
import WebDevEssentials from '../pages/bootcamps/WebDevEssentials';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route for Bootcamps */}
        <Route path="/bootcamps" element={<BootcampLayout />}>
          <Route path="generative-ai-automation" element={<GenerativeAIAutomation />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="cybersecurity-bootcamp" element={<CybersecurityBootcamp />} />
          <Route path="cybersecurity-introduction" element={<CybersecurityIntroduction />} />
          <Route path="power-bi" element={<PowerBI />} />
          <Route path="ui-ux-design" element={<UIUXDesign />} />
          <Route path="web-dev-essentials" element={<WebDevEssentials />} />
        </Route>
        
        {/* Redirect root to one of the bootcamps for now, or a generic home page if it existed */}
        <Route path="*" element={<Navigate to="/bootcamps/web-dev-essentials" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
