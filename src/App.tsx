
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SemesterRecords from "./pages/SemesterRecords";
import PersonalDocuments from "./pages/PersonalDocuments";
import Achievements from "./pages/Achievements";
import RecordDetails from "./pages/RecordDetails";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="semesters" element={<SemesterRecords />} />
          <Route path="documents" element={<PersonalDocuments />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="record/:id" element={<RecordDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
