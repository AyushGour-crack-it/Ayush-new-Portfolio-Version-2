import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";

function App() {
  return (
   <div className="w-full min-h-screen">
  <Navbar />
  <HeroSection />
  <SkillsSection />
  <AboutSection />
  <ProjectsSection />
  <ContactSection />
  <Footer />
</div>
  );
}

export default App;