
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from "@/components/Layout";
import { Index } from "@/pages/Index";
import { BusinessDashboard } from "@/pages/BusinessDashboard";
import NotFound from "@/pages/NotFound";
import ProfilePage from "@/pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout title="Home">
              <Routes>
                <Route index element={<Index />} />
                <Route path="/dashboard" element={<BusinessDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
