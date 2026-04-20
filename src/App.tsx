import { useState } from "react";
import { NoiseOverlay } from "./components/ui/noise-overlay";
import { SpotlightCursor } from "./components/ui/spotlight-cursor";
import { RipplePulseLoader } from "./components/ui/ripple-pulse-loader";
import Navigation from "./components/Navigation";
import { HeroSection } from "./components/ui/background-paths";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import { ProcessSection } from "./components/ui/process-section";
import AboutSection from "./components/AboutSection";
import { ContactCard } from "./components/ui/contact-card";
import { CinematicFooter } from "./components/ui/cinematic-footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Always-on global layers */}
      <NoiseOverlay />
      <div className="hidden md:block">
        <SpotlightCursor />
      </div>

      {/* Page loader */}
      <RipplePulseLoader onComplete={() => setLoaded(true)} />

      {/* Main content — rendered immediately, visible after loader fades */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <ServicesSection />
          <WorkSection />
          <ProcessSection />
          <AboutSection />
          <ContactCard />
        </main>
        <CinematicFooter />
      </div>
    </>
  );
}
