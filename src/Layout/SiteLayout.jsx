/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// @TODO: Add and Work on the footer at the end
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SiteLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container py-5">{children}</main>
      {/* <Footer/>  */}
    </div>
  );
};

export default SiteLayout;
