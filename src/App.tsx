import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import UnderConstructionModal from "./components/shared/UnderConstructionModal";
import Index from "./pages/Index";
import LecturaEstructural from "./pages/LecturaEstructural";
import ProcesoSanark from "./pages/ProcesoSanark";
import LecturaIntroductoria from "./pages/LecturaIntroductoria";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import AvisoLegal from "./pages/AvisoLegal";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import LecturaBasica from "./pages/LecturaBasica";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <UnderConstructionModal />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lectura-estructural" element={<LecturaEstructural />} />
          <Route path="/proceso-sanark" element={<ProcesoSanark />} />
          <Route path="/lectura-introductoria" element={<LecturaIntroductoria />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/lectura-basica" element={<LecturaBasica />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
