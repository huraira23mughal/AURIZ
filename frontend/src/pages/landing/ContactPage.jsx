import Navbar from "../../components/layout/Navbar";
import Contact from "../../components/home/Contact";
import Footer from "../../components/layout/Footer";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
