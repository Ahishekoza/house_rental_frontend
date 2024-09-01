/* eslint-disable react/prop-types */
import { getSingleProperty } from "@/api/PropertyApi";
// import SiteLayout from "@/Layout/SiteLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addDays } from "date-fns";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import SiteLayout from "@/Layout/SiteLayout";

const SinglePropertyPage = () => {
  const user = useSelector((state) => state.auth.user);

  const { propertyId } = useParams();
  const [property_data, setPropertyData] = useState({
    isloading: false,
  });
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  const checkout_login_button = user?.email
    ? "Reserve"
    : "Login to reserve the property";


  const handleReserve = ()=>{
    const date_formate = new Date(date?.from);
   const isoDate = format(date_formate, "yyyy-MM-dd");
   console.log(isoDate);
  }

  useEffect(() => {
    const fetchSingleProperty = async () => {
      setPropertyData({ ...property_data, isloading: true });
      const data = await getSingleProperty(propertyId);
      setPropertyData({ ...data, isloading: false });
    };

    fetchSingleProperty();
  }, [propertyId]);

  return (
    // @TODO:- Manage a state for Header because header for home page is different and for others its different
    // @TODO:- Remove the className for the div because it is already present in SiteLayout once you finish with Header state management
    <SiteLayout>
      {property_data?.isloading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <span className="text-3xl font-bold text-neutral-800">
            {property_data?.title}
          </span>
          {/* ---Photos Screen */}
          <div className="grid grid-cols-2 space-x-2 mt-5 relative">
            {property_data?.images?.length > 0 && (
              <div className="image_container">
                <img
                  src={property_data?.images[0]?.url}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <div className="image_hover_bg"></div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {property_data?.images?.slice(1).map((image, index) => (
                <div key={index} className="image_container">
                  <img
                    src={image?.url}
                    className={
                      index % 2 == 0
                        ? "w-full h-full object-cover"
                        : "w-full h-full object-cover rounded-r-lg"
                    }
                  />
                  <div className="image_hover_bg"></div>
                </div>
              ))}
            </div>
            <span className="absolute bottom-4 flex items-center gap-1 right-4 bg-slate-200 py-1 px-4 border border-neutral-500 cursor-pointer rounded-md">
              <BsGrid3X3GapFill />
              Show all photos
            </span>
          </div>

          {/*  */}

          <div className="grid grid-cols-2 space-x-2 mt-5 relative">
            {/* ---LEFT SIDE INFO CONTAINER */}
            <div className="flex flex-col ">
              {/* Content here */}
              <div className="flex flex-col items-start text-neutral-800">
                <span className="text-3xl font-semibold">
                  {property_data?.title}
                </span>
                <span className="text-xl">
                  {property_data?.totalGuests} guests .{" "}
                  {property_data?.rooms_beds?.rooms} bedrooms .{" "}
                  {property_data?.rooms_beds?.beds} beds .{" "}
                  {property_data?.rooms_beds?.bathrooms}{" "}
                  {property_data?.rooms_beds?.bathrooms > 1
                    ? "bathrooms"
                    : "bathroom"}
                </span>
              </div>
              {/* Additional content */}
            </div>

            {/* ---RIGHT SIDE CHECKOUT BUTTON */}
            {/* @TODO:- create a separate component for checkout card */}
            <div className="relative">
              <div className="sticky top-4 flex justify-center items-center">
                <Card className="w-[400px]">
                  <CardHeader>
                    <CardTitle>
                      ${property_data?.price}
                      <span className="text-neutral-400 mx-2">night</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className=" flex flex-col gap-5">
                      <div className="flex border  border-1 border-neutral-600 rounded-md p-2">
                        <div className={"grid gap-2 w-full"}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                  "w-full   text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      <div className="flex  w-full items-start justify-between">
                                        <div className="flex flex-col ">
                                          <span>CheckIn</span>
                                          <span>
                                            {format(date.from, "LLL dd, y")}
                                          </span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span>CheckOut</span>
                                          <span>
                                            {format(date.to, "LLL dd, y")}
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    format(date.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={(newDate) => {
                                  setDate(newDate);
                                }}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      {date?.from && date?.to && (
                        <Button
                          disabled={user?.email ? false : true}
                          onClick={handleReserve}
                          className="w-full bg-red-500  text-white hover:bg-[#DD1062] "
                        >
                          {checkout_login_button}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
};

export default SinglePropertyPage;
