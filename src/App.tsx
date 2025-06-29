import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Companies from "./pages/Companies";
import Services from "./pages/Services";
import ActivityLog from "./pages/ActivityLog";
import Staff from "./pages/Staff";
import Insights from "./pages/Insights";
import Statistics from "./pages/Statistics";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Equipment from "./pages/Equipment";
import ProblemsAndAreas from "./pages/ProblemsAndAreas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kunder" element={<Customers />} />
            <Route path="/foretag" element={<Companies />} />
            <Route path="/tjanster" element={<Services />} />
            <Route path="/utrustning" element={<Equipment />} />
            <Route path="/problem-omraden" element={<ProblemsAndAreas />} />
            <Route path="/behandlingar" element={<Services />} />
            <Route path="/aktiviteter" element={<ActivityLog />} />
            <Route path="/personal" element={<Staff />} />
            <Route path="/insikter" element={<Insights />} />
            <Route path="/statistik" element={<Statistics />} />
            <Route path="/kalender" element={<Calendar />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
