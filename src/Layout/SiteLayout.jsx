/* eslint-disable react/prop-types */
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const SiteLayout = ({children}) => {
  return (
    <div >
        <Header/>
        {/* <main>
           {children}
        </main>
        <Footer/> */}
    </div>
  )
}

export default SiteLayout