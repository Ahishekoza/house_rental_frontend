/* eslint-disable react-hooks/exhaustive-deps */
import { FaAirbnb, FaUserCircle } from "react-icons/fa";

import { IoIosMenu } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchByPlace_Guest from "./SearchByPlace_Guest";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import FeatureCarousel from "./FeatureCarousel";
import { getProperties } from "@/api/PropertyApi";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Stays");
  const [features, setFeatures] = useState(null);

  // -- handle Search Based On Query
  const handleSearchQuery = async(query) => {
    await getProperties(query)
  };

  // -- handle Search Based On Features
  const handleSearchQueryFeatures = async() => {
    
    await getProperties({features: features})
  
  };

  useEffect(() => {
    handleSearchQueryFeatures();
  }, [features]);

  return (
    <div className="border-b-2 border-neutral-300 sticky top-0 bg-white shadow-md">
      <div className="flex flex-col ">
        {/* --Header and Search  */}
        <div className="flex flex-row items-start justify-between py-5  container ">
          <div className="flex  gap-0.5 text-red-500  text-2xl">
            <FaAirbnb className="text-4xl" />
            <span className="font-bold">airbnb</span>
          </div>

          <div>
            <Tabs
              defaultValue="Stays"
              className="flex flex-col w-full items-center gap-6"
            >
              <div>
                <TabsList className="flex  gap-10 bg-transparent text-neutral-600">
                  <TabsTrigger
                    value="Stays"
                    onClick={() => setActiveTab("Stays")}
                    className={
                      activeTab === "Stays" ? "text-neutral-800 font-bold" : ""
                    }
                  >
                    Stays
                  </TabsTrigger>
                  <TabsTrigger
                    value="Experiences"
                    onClick={() => setActiveTab("Experience")}
                    className={
                      activeTab === "Experience"
                        ? "text-neutral-800 font-bold"
                        : ""
                    }
                  >
                    Experiences
                  </TabsTrigger>
                </TabsList>
              </div>
              <div>
                <TabsContent value="Stays">
                  <SearchByPlace_Guest handleSearchQuery={handleSearchQuery} />
                </TabsContent>
                <TabsContent value="Experiences">
                  <h1>Experiences</h1>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="bg-white text-2xl text-neutral-500 border border-neutral-500 w-20 h-fit p-2 flex justify-evenly shadow-sm rounded-full">
                  <IoIosMenu />
                  <FaUserCircle />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="bg-white p-3 flex flex-col gap-2 shadow-md rounded-md">
                  <div className=" w-[200px]  flex flex-col gap-4 ">
                    <Link to="/register" className="text-neutral-700">
                      Sign up
                    </Link>
                    <Link to="/login" className="text-neutral-700">
                      Login
                    </Link>
                  </div>
                  <Separator className="border border-t-1 border-neutral-500" />
                  <Link to={"/property"}>Airbnb your home</Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator className="border border-t-0 border-neutral-400" />

        {/* Features */}
        <div className="container my-5">
          <FeatureCarousel setFeatures={setFeatures} />
        </div>
      </div>
    </div>
  );
};

export default Header;
