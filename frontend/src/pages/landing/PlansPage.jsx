import Navbar from "../../components/layout/Navbar";
import Plans from "../../components/home/Plans";
import Footer from "../../components/layout/Footer";

function PlansPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <Plans />
      </div>
      <Footer />
    </>
  );
}

export default PlansPage;
