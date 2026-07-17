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
      <Stats />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;
