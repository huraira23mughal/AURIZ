import Navbar from "../../components/layout/Navbar";
import About from "../../components/home/About";
import Footer from "../../components/layout/Footer";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <About />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
