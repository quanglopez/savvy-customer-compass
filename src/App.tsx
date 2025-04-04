
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/builder" element={<Layout title="Xây dựng chatbot"><ChatbotBuilder /></Layout>} />
          <Route path="/conversations" element={<Layout title="Hội thoại"><Conversations /></Layout>} />
          <Route path="/analytics" element={<Layout title="Phân tích"><Analytics /></Layout>} />
          <Route path="/settings" element={<Layout title="Cài đặt"><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
