import PropertyCard from "@/components/PropertyCard";
import SiteLayout from "@/Layout/SiteLayout.jsx";

import { useSelector } from "react-redux";

const HomePage = () => {
  const query_results = useSelector((state) => state.filter_queries.query_data);

  return (
    <SiteLayout homePage={true}>
      {/* ---@TODO -- Carousel for each section // create a section component */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {query_results.map((query_result) => {
          return (
            <PropertyCard query_result={query_result} key={query_result?._id} />
          );
        })}

       
      </div>
    </SiteLayout>
  );
};

export default HomePage;
