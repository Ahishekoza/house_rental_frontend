Button; /* eslint-disable react-hooks/exhaustive-deps */
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const Header = () => {
  const [features, setFeatures] = useState(null);

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex flex-col gap-2">
                          <span className="cursor-pointer">Log in</span>
                          <span className="cursor-pointer">Sign up</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Log in or</DialogTitle>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
