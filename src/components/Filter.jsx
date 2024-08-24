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

const Filter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ---If user closes the dialog box before clicking on the show result button then null the filters
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setFilters({});
      setIsOpen(isOpen);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="border-2 bg-transparent hover:transition-all hover:border-neutral-800 hover:bg-neutral-200 text-neutral-800 border-neutral-400"
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
            <div className="flex flex-col items-start">
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
                  className="border-1 border-neutral-600"
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
                  className="border-1 border-neutral-600"
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
          </div>
        </ScrollArea>
        <Separator className="border-1 mb-2 border-neutral-500" />
        <div className="flex items-center justify-between px-5">
          <Button
            className="bg-transparent text-neutral-800 border border-neutral-950 hover:bg-transparent"
            onClick={() => setFilters({})}
          >
            Clear
          </Button>
          <Button>Show 100+</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
