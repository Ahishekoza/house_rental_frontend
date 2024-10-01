/* eslint-disable react/prop-types */
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { useSelector } from "react-redux";

const Filter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(0)
  const {query_data} =  useSelector(state=>state.filter_queries)


  const handlePriceChange = (value)=>{
    setPriceRange(value)
    setFilters({...filters,priceRange: value[0]})
  }

  const handleRoomPuralChange = ()=>{
    return query_data.length>1 ?"rooms":"room"
  }

  // ---If user closes the dialog box before clicking on the show result button then null the filters
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setIsOpen(isOpen);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="border-2 bg-transparent xs:w-full  hover:transition-all hover:border-neutral-800 hover:bg-neutral-200 text-neutral-800 border-neutral-400"
        >
          <TbAdjustmentsHorizontal />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">Filters</DialogTitle>
          <Separator className="border-1 mb-2 border-neutral-500" />
        </DialogHeader>
        <ScrollArea className="w-full h-[400px]">
          <div className="p-5 flex flex-col gap-3">
            {/* Type of Place */}
            <div className="flex flex-col mb-5 items-start">
              <span className="filter_text mb-5">Type of place</span>
              <div className="w-full h-16 rounded-xl border-2 flex items-center justify-evenly border-neutral-400 p-1">
                <span
                  className={
                    filters.place_type === ""
                      ? "place_option place_option_selected"
                      : "place_option"
                  }
                  onClick={() => setFilters({ ...filters, place_type: "" })}
                >
                  Any type
                </span>
                <Separator
                  orientation="vertical"
                  className="border-solid border-neutral-600"
                />
                <span
                  className={
                    filters.place_type === "Hotel"
                      ? "place_option place_option_selected"
                      : "place_option"
                  }
                  onClick={() =>
                    setFilters({ ...filters, place_type: "Hotel" })
                  }
                >
                  Hotel
                </span>
                <Separator
                  orientation="vertical"
                  className="border-solid border-neutral-600"
                />
                <span
                  className={
                    filters.place_type === "Room"
                      ? "place_option place_option_selected"
                      : "place_option"
                  }
                  onClick={() => setFilters({ ...filters, place_type: "Room" })}
                >
                  Room
                </span>
                <Separator
                  orientation="vertical"
                  className="border-solid border-neutral-600"
                />
                <span
                  className={
                    filters.place_type === "Entire Home"
                      ? "place_option place_option_selected"
                      : "place_option"
                  }
                  onClick={() =>
                    setFilters({ ...filters, place_type: "Entire Home" })
                  }
                >
                  Entire Home
                </span>
              </div>
            </div>
            <Separator className="separator_border" />
            {/* Price Range */}
            <div>
              <span className="filter_text mb-5">Price range</span>
              <div className="my-5">
                <Slider
                  onValueCommit={handlePriceChange}
                  defaultValue={[0]}
                  min={0}
                  max={100000}
                  step={1}
                  className=" w-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="max_min_price_parent">
                  <p className="max_min_price_name">Minimum</p>
                  <span className="max_min_price_container">₹{priceRange}</span>
                </div>
                <div className="max_min_price_parent">
                  <p className="max_min_price_name">Maximum</p>
                  <span className="max_min_price_container">₹100000+</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <Separator className="separator_border " />
        <div className="flex items-center justify-between px-5">
          <Button
            className="bg-transparent text-neutral-800 border border-neutral-950 hover:bg-transparent"
            onClick={() => setFilters({})}
          >
            Clear
          </Button>
          <Button>Show {query_data.length} {handleRoomPuralChange()} </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
