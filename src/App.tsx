
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerProfile from "./pages/CustomerProfile";
import Companies from "./pages/Companies";
import Services from "./pages/Services";
import ActivityLog from "./pages/ActivityLog";
import Staff from "./pages/Staff";
import Insights from "./pages/Insights";
import Statistics from "./pages/Statistics";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import ProblemsAndAreas from "./pages/ProblemsAndAreas";
import CustomerPortalDashboard from "./pages/portal/CustomerPortalDashboard";
import CustomerPortalProfile from "./pages/portal/CustomerPortalProfile";
import CustomerPortalProblems from "./pages/portal/CustomerPortalProblems";
import CustomerPortalTreatmentPlan from "./pages/portal/CustomerPortalTreatmentPlan";
import CustomerPortalHistory from "./pages/portal/CustomerPortalHistory";

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
            <Route path="/kunder/:customerId" element={<CustomerProfile />} />
            <Route path="/foretag" element={<Companies />} />
            <Route path="/tjanster" element={<Services />} />
            <Route path="/problem-omraden" element={<ProblemsAndAreas />} />
            <Route path="/behandlingar" element={<Services />} />
            <Route path="/aktiviteter" element={<ActivityLog />} />
            <Route path="/personal" element={<Staff />} />
            <Route path="/insikter" element={<Insights />} />
            <Route path="/statistik" element={<Statistics />} />
            <Route path="/kalender" element={<Calendar />} />
            
            {/* Customer Portal Routes */}
            <Route path="/portal" element={<CustomerPortalDashboard />} />
            <Route path="/portal/profil" element={<CustomerPortalProfile />} />
            <Route path="/portal/problem" element={<CustomerPortalProblems />} />
            <Route path="/portal/behandlingsplan" element={<CustomerPortalTreatmentPlan />} />
            <Route path="/portal/historik" element={<CustomerPortalHistory />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
