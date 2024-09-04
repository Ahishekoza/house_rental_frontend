/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CheckOutCard = ({
  propertyData,
  date,
  setDate,
  stayForNoDays,
  checkoutLoginButton,
  handleReserve,
  user,
}) => {
  return (
    <div className="relative">
      <div className="sticky top-4 flex justify-center items-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>
              ${propertyData?.price}
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
                          date?.to ? (
                            <>
                              <div className="flex  w-full items-start justify-between">
                                <div className="flex flex-col ">
                                  <span>CheckIn</span>
                                  <span>{format(date?.from, "LLL dd, y")}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span>CheckOut</span>
                                  <span>{format(date?.to, "LLL dd, y")}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            format(date?.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                <>
                  <div>
                    <Button
                      disabled={user?.email ? false : true}
                      onClick={handleReserve}
                      className="w-full bg-red-500  text-white hover:bg-[#DD1062] "
                    >
                      {checkoutLoginButton}
                    </Button>
                    <div className="flex  items-center justify-between text-neutral-700 mt-3">
                      {/* @TODO : -- Add Popover to get the Detail of the price breakdown */}
                      <span className="cursor-pointer underline">
                        ${propertyData?.price} x {stayForNoDays} nights
                      </span>
                      <span>${propertyData?.price * stayForNoDays}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckOutCard;
