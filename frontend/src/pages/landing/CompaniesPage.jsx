import Navbar from "../../components/layout/Navbar";
import Companies from "../../components/home/Companies";
import Footer from "../../components/layout/Footer";

function CompaniesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <Companies />
      </div>
      <Footer />
    </>
  );
}

export default CompaniesPage;
