import Navbar from "../../components/layout/Navbar";
import News from "../../components/home/News";
import Footer from "../../components/layout/Footer";

function NewsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 md:pt-28">
        <News />
      </div>
      <Footer />
    </>
  );
}

export default NewsPage;
