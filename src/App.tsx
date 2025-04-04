
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import ChatbotBuilder from "./components/ChatbotBuilder";
import Conversations from "./components/Conversations";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout title="Tổng quan">
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/builder" element={
              <ProtectedRoute>
                <Layout title="Xây dựng chatbot">
                  <ChatbotBuilder />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/conversations" element={
              <ProtectedRoute>
                <Layout title="Hội thoại">
                  <Conversations />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Layout title="Phân tích">
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout title="Cài đặt">
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
