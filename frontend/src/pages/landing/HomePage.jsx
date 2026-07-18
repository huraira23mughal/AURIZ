import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Features from "../../components/home/Features";
import Testimonials from "../../components/home/Testimonials";
import Footer from "../../components/layout/Footer";
import AurizBackground from "../../components/AurizBackground"; // 1. Import background

function HomePage() {
  return (
    <>
      <AurizBackground /> {/* 2. Add background first */}

      <div className="relative z-10"> {/* 3. Wrap all content so it shows above background */}
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;