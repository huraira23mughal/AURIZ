import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Features from "../../components/home/Features";
import Testimonials from "../../components/home/Testimonials";
import Footer from "../../components/layout/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Stats />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;
