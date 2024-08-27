/* eslint-disable no-unused-vars */
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
import Login_Signup_Dialog from "./Login_Signup_Dialog";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/slice/authSlice";
import Filter from "./Filter";
import { setQuery } from "@/slice/querySlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const { query } = useSelector((state) => state.filter_queries);

  const dispatch = useDispatch();

  const [features, setFeatures] = useState(query?.features);
  const [filters, setFilters] = useState({
    place_type: query?.propertyType,
  });

  // -- handle Search Based On Query
  const handleSearchQuery = async (query) => {
    await getProperties(query);
  };

  // -- handle Search Based On Features
  const handleSearchQueryFeatures = async () => {
    // First, update the query in the store with the new features
    dispatch(setQuery({ ...query, features }));
  };

  useEffect(() => {
    handleSearchQueryFeatures();
  }, [features]);

  const handleSearchQueryFilter = async () => {
    // Update query in the store with the new filters and features
    dispatch(setQuery({ propertyType: filters?.place_type, features }));
  };

  useEffect(() => {
    handleSearchQueryFilter();
  }, [filters]);

  // This useEffect will run whenever `query` changes, including after features are updated
  useEffect(() => {
    // Perform the actual property search here
    if (query) {
      getProperties(query);
    }
  }, [query]);

  return (
    <div className="border-b-2 border-neutral-300 bg-white shadow-md">
      <div className="flex flex-col">
        {/* --Header and Search */}
        <div className="flex flex-row items-start justify-between py-5 container">
          <div className="flex gap-0.5 text-red-500 text-2xl">
            <FaAirbnb className="text-4xl" />
            <span className="font-bold">airbnb</span>
          </div>

          <div>
            <Tabs
              defaultValue="Stays"
              className="flex flex-col w-full items-center gap-6"
            >
              <div>
                <TabsList className="flex gap-10 bg-transparent text-neutral-600">
                  <TabsTrigger value="Stays">Stays</TabsTrigger>
                  <TabsTrigger value="Experiences">Experiences</TabsTrigger>
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
                <div className="flex flex-col gap-2">
                  <div className="w-[200px]">
                    {user ? (
                      <>
                        <div className="flex flex-col gap-3">
                          <Link
                            to={"/notifications"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300"
                          >
                            Notifications
                          </Link>
                          <Link
                            to={"/messages"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300"
                          >
                            Messages
                          </Link>
                          <Link
                            to={"/aacount"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300"
                          >
                            Account
                          </Link>
                        </div>
                      </>
                    ) : (
                      <Login_Signup_Dialog />
                    )}
                  </div>
                  <Separator className="border border-t-1 border-neutral-500" />
                  <Link
                    to={"/property"}
                    className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300"
                  >
                    Airbnb your home
                  </Link>
                  {user && (
                    <span
                      className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300"
                      onClick={() => dispatch(clearUser())}
                    >
                      Logout
                    </span>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator className="border border-t-0 border-neutral-400" />

        {/* Features */}
        <div className="container flex items-center gap-20">
          <FeatureCarousel
            setFeatures={setFeatures}
            feature_selected={features}
          />
          {features && <Filter filters={filters} setFilters={setFilters} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
