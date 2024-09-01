import PropertyCard from "@/components/PropertyCard";
import SiteLayout from "@/Layout/SiteLayout.jsx";

import { useSelector } from "react-redux";

const HomePage = () => {
  const query_results = useSelector((state) => state.filter_queries.query_data);

  return (
    <SiteLayout>
      {/* ---@TODO -- Disply Query_results */}
      <div className="grid grid-cols-4 space-x-2 ">
        {
          query_results.map((query_result)=>{
            return <PropertyCard query_result={query_result} key={query_result?._id}/>
          })
        }
      </div>
    </SiteLayout>
  );
};

export default HomePage;
