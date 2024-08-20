/* eslint-disable react/prop-types */
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

const SearchByPlace_Guest = ({ handleSearchQuery }) => {
  // --- On basis of total number of quests we will suggest the user how many number of beds or rooms he need
  const [query, setQuery] = useState({
    country: "",
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

  const handleSearch = () => {
    handleSearchQuery({
      totalGuests: query.totalGuests || "",
      country: query.country || "",
    });

    setQuery({
      country: "",
      adults: 0,
      children: 0,
      infants: 0,
      totalGuests: 0,
    });
  };

  // @TODO: Create a function that will take handleSearchQuery and pass the values in it and onces its done it will make the query null

  return (
    <div className="border w-full  border-neutral-400 rounded-2xl ">
      <div className="flex flex-row p-3 h-full w-full">
        {/* --- Country */}
        <div className="flex flex-col text-sm w-full  cursor-pointer">
          <span className="font-semibold">Where</span>
          <Input
            value={query.country}
            onChange={(e) => setQuery({ ...query, country: e.target.value })}
            placeholder="Search By Country"
          />
        </div>

        <Separator orientation="vertical" />

        {/* ---Guests */}
        <div className="flex text-start flex-col w-full text-sm">
          <span className="font-semibold">Who</span>
          <Popover onOpenChange={handlePopoverChange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-neutral-600 font-normal px-0"
              >
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
          onClick={handleSearch}
          className="bg-red-500 text-white hover:bg-[#DD1062]  w-[8rem] rounded-full flex items-center justify-center"
        >
          <CiSearch className="font-bold text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchByPlace_Guest;
