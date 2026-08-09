
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Fable from "./pages/Fable";
import BetterFable from "./pages/BetterFable";
import Studio from "./pages/Studio";
import Bento from "./pages/Bento";
import Console from "./pages/Console";
import Flagship from "./pages/Flagship";
import Deck from "./pages/Deck";
import Ops from "./pages/Ops";
import Gallery from "./pages/Gallery";
import SwissMinimalist from "./pages/SwissMinimalist";
import NeoBrutalism from "./pages/NeoBrutalism";
import Sketch from "./pages/Sketch";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/fable" element={<Fable />} />
          <Route path="/better-fable" element={<BetterFable />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/bento" element={<Bento />} />
          <Route path="/console" element={<Console />} />
          <Route path="/flagship" element={<Flagship />} />
          <Route path="/deck" element={<Deck />} />
          <Route path="/ops" element={<Ops />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/swiss-minimalist" element={<SwissMinimalist />} />
          <Route path="/neo-brutalism" element={<NeoBrutalism />} />
          <Route path="/sketch" element={<Sketch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
