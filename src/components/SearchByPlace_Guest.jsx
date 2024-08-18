import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CiSearch, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const SearchByPlace_Guest = () => {
  // --- On basis of total number of quests we will suggest the user how many number of beds or rooms he need
  const [query, setQuery] = useState({
    place: "",
    adults: 0,
    children: 0,
    infants: 0,
    totalGuests: 0,
  });

  const handlePopoverChange = (isOpen) => {
    if (!isOpen) {
      setQuery({
        ...query,
        totalGuests: query.adults + query.children + query.infants,
      });
    }
  };

  const handleGuestsCount = (guest_category, action) => {
    switch (guest_category) {
      case "adults":
        if (action === "increment") {
          query.adults += 1;
        } else if (action === "decrement" && query.adults > 0) {
          query.adults -= 1;
        }
        break;
      case "children":
        if (action === "increment") {
          query.children += 1;
        } else if (action === "decrement" && query.children > 0) {
          query.children -= 1;
        }
        break;
      case "infants":
        if (action === "increment") {
          query.infants += 1;
        } else if (action === "decrement" && query.infants > 0) {
          query.infants -= 1;
        }
        break;

      default:
        return;
    }
    setQuery({ ...query });
  };

  const handleSearchQuery = () => {
    console.log(query.place, query.totalGuests);
  };

  return (
    <div className="border  w-full  border-neutral-400 rounded-full">
      <div className="flex   p-3">
        {/* --- Place */}
        <div className="flex flex-col text-sm w-full  cursor-pointer">
          <span className="font-semibold">Where</span>
          <Input
            className="text-neutral-800 placeholder:text-neutral-500 border-none outline-none text-md focus:border-none focus:ring-0 "
            onChange={(e) => setQuery({ ...query, place: e.target.value })}
            placeholder="Search Destinations"
          />
        </div>
        <Separator
          orientation="vertical"
          className="w-[1px] mr-2 bg-neutral-300"
        />

        {/* ---Guests */}
        <div className="flex text-start flex-col w-full text-sm">
          <span className="font-semibold">Who</span>
          <Popover onOpenChange={handlePopoverChange}>
            <PopoverTrigger asChild>
              <Button className="text-left text-neutral-500">
                {" "}
                {query?.totalGuests > 0 ? query.totalGuests : "Guests"}{" "}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] bg-white shadow-md rounded-md mt-5">
              <div className="p-5">
                <div className="flex items-center text-2xl justify-between">
                  <div className="flex flex-col">
                    <span>Adults</span>
                    <span className="text-sm text-neutral-500">
                      Ages 13 or above
                    </span>
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => handleGuestsCount("adults", "increment")}
                    >
                      <CiCirclePlus className="text-3xl" />
                    </button>
                    <span className="text-xl">{query.adults}</span>
                    <button
                      onClick={() => handleGuestsCount("adults", "decrement")}
                    >
                      <CiCircleMinus className="text-3xl" />
                    </button>
                  </div>
                </div>
                <Separator className="my-4 border-t border-neutral-300" />

                <div className="flex items-center text-2xl justify-between">
                  <div className="flex flex-col">
                    <span>Children</span>
                    <span className="text-sm text-neutral-500">Ages 2–12</span>
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => handleGuestsCount("children", "increment")}
                    >
                      <CiCirclePlus className="text-3xl" />
                    </button>
                    <span className="text-xl">{query.children}</span>
                    <button
                      onClick={() => handleGuestsCount("children", "decrement")}
                    >
                      <CiCircleMinus className="text-3xl" />
                    </button>
                  </div>
                </div>
                <Separator className="my-4 border-t border-neutral-300" />

                <div className="flex items-center text-2xl justify-between">
                  <div className="flex flex-col">
                    <span>Infants</span>
                    <span className="text-sm text-neutral-500">Under 2</span>
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => handleGuestsCount("infants", "increment")}
                    >
                      <CiCirclePlus className="text-3xl" />
                    </button>
                    <span className="text-xl">{query.infants}</span>
                    <button
                      onClick={() => handleGuestsCount("infants", "decrement")}
                    >
                      <CiCircleMinus className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <button
          onClick={handleSearchQuery}
          className="bg-red-500 text-white hover:bg-[#DD1062]  w-[10rem] rounded-full flex items-center justify-center"
        >
          <CiSearch className="font-bold text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchByPlace_Guest;
