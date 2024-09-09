import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleProperty } from "@/api/PropertyApi";

const SuccessPage = () => {
  const { propertyId, startDate, endDate } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [propertyData, setPropertyData] = useState({
    tenant: user?._id,
  });
  console.log(propertyId, startDate, endDate);

  useEffect(() => {
    const fetchSingleProperty = async () => {
      setPropertyData({ ...propertyData });
      const data = await getSingleProperty(propertyId);
      setPropertyData({ ...data });
    };

    fetchSingleProperty();
  }, [propertyId]);


  // @TODO:---CREATE RENTAL PROPERTY 

  useEffect(() => {
    const fetchSingleProperty = async () => {
     setTimeout(()=>{

     },5000)
    };

    fetchSingleProperty();
  }, [propertyId,startDate,endDate,user]);

  

  return (
    <div className="h-screen w-full">
      <div className=" h-full flex justify-center  items-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>
              <span className="flex gap-2 items-center">
                Payment Successfull
                <span className="p-1  w-fit h-fit rounded-full bg-green-300">
                  <TiTickOutline className="text-white" />
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <span>
                <span className="text-xl font-medium text-slate-900">
                  Property :-{" "}
                </span>
                {propertyData?.title}
              </span>
              <span>
                Booked from{" "}
                <span className=" underline font-semibold">{startDate}</span> to{" "}
                <span className="underline font-semibold">{endDate}</span>{" "}
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
