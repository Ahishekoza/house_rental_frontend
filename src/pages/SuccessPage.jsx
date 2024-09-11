import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleProperty } from "@/api/PropertyApi";
import { rentalProperty } from "@/api/RentalApi";

const SuccessPage = () => {
  const { propertyId, startDate, endDate } = useParams();

  const formatedStartDate = new Date(startDate).toISOString().split("T")[0];
  const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

  const user = useSelector((state) => state.auth.user);
  const [propertyData, setPropertyData] = useState(null); // Initialize with null
  const navigate = useNavigate();

  // Fetch property data
  useEffect(() => {
    const fetchSingleProperty = async () => {
      try {
        const data = await getSingleProperty(propertyId);
        setPropertyData(data); // Set property data once
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    if (propertyId) {
      fetchSingleProperty();
    }
  }, [propertyId]); // Only fetch property once when propertyId changes


  
  const isFirstRun = useRef(true); // Create a ref to track first render
  // Create rental property and handle success
  useEffect(() => {
    const createRentalProperty = async () => {
      try {
        const { success } = await rentalProperty(
          propertyId,
          startDate,
          endDate,
          user?._id
        );
        if (success) {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Error creating rental:", error);
      }
    };

    if (isFirstRun.current) {
      if (propertyId && startDate && endDate && user) {
        createRentalProperty();
      }
      isFirstRun.current = false; // Set to false after first run
    }
  }, [propertyId, startDate, endDate, user, navigate]); // Depend only on these values

  return (
    <div className="h-screen w-full">
      <div className="h-full flex justify-center items-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>
              <span className="flex gap-2 items-center">
                Payment Successful
                <span className="p-1 w-fit h-fit rounded-full bg-green-300">
                  <TiTickOutline className="text-white" />
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <span>
                <span className="text-xl font-medium text-slate-900">
                  Property:
                </span>{" "}
                {propertyData?.title}
              </span>
              <span>
                Booked from{" "}
                <span className="underline font-semibold">
                  {formatedStartDate}
                </span>{" "}
                to{" "}
                <span className="underline font-semibold">
                  {formattedEndDate}
                </span>
              </span>
              <span className="text-center text-xl font-bold mt-3">
                Thank you!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
