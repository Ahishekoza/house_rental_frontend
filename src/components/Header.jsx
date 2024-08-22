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

import { Button } from "./ui/button";
import Login_Signup_Dialog from "./Login_Signup_Dialog";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/slice/authSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [features, setFeatures] = useState(null);
  const [filters , setFilters] = useState({
    place_type:'Any Type',
  });

  // -- handle Search Based On Query
  const handleSearchQuery = async (query) => {
    await getProperties(query);
  };

  // -- handle Search Based On Features
  const handleSearchQueryFeatures = async () => {
    await getProperties({ features: features });
  };

  useEffect(() => {
    handleSearchQueryFeatures();
  }, [features]);

  return (
    <div className="border-b-2 border-neutral-300  bg-white shadow-md">
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
                <div className=" flex flex-col gap-2 ">
                  <div className=" w-[200px] ">
                    {/* --- SignIn / Login Dialog */}
                    {user ? (
                      <>
                        <div className="flex flex-col gap-3">
                          <Link
                            to={"/notifications"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300 "
                          >
                            Notifications
                          </Link>
                          <Link
                            to={"/messages"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300 "
                          >
                            Messages
                          </Link>
                          <Link
                            to={"/aacount"}
                            className="hover:border-l-4 hover:transition-all hover:border-red-300 "
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
                    className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300 "
                  >
                    Airbnb your home
                  </Link>
                  {user && (
                    <span
                      className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300 "
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
        <div className="container my-5 flex items-center gap-20">
          <FeatureCarousel setFeatures={setFeatures} feature_selected={features} />
          {features && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="border-2 bg-transparent hover:transition-all hover:border-neutral-800 hover:bg-neutral-200 text-neutral-800 border-neutral-400 ">
                  <TbAdjustmentsHorizontal />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center mb-2">
                    Filters
                  </DialogTitle>
                  <Separator className="border-1 mb-2 border-neutral-500"/>
                </DialogHeader>
                {/* @TODO:-- wrap the Dialog content in the scrollable Area  */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex flex-col items-start">
                    <span className="filter_text mb-5">Type of place</span>
                    <div className="w-full h-16 rounded-xl border-2 flex items-center justify-evenly border-neutral-400 p-1">
                      <span className="place_option">Any type</span>
                      <Separator orientation="vertical" className="border-1 border-neutral-600" />
                      <span className="place_option">Room</span>
                      <Separator orientation="vertical" className="border-1 border-neutral-600" />
                      <span className="place_option ">Entire Home</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
