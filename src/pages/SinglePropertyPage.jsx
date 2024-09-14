/* eslint-disable react/prop-types */
import { getSingleProperty } from "@/api/PropertyApi";
// import SiteLayout from "@/Layout/SiteLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGrid3X3GapFill } from "react-icons/bs";

import { useSelector } from "react-redux";
import SiteLayout from "@/Layout/SiteLayout";
import { formaDatesAndGetDaysDifference } from "../../utils/date_format_days_difference.js";
import CheckOutCard from "@/components/CheckOutCard.jsx";
import { checkAvailability } from "@/api/RentalApi.js";
import { stripePaymentCheckout } from "@/api/PaymentApi.js";

const SinglePropertyPage = () => {
  const user = useSelector((state) => state.auth.user);

  const { propertyId } = useParams();
  const [propertyData, setPropertyData] = useState({
    isloading: false,
    tenant: user?._id,
  });
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  const [stayForNoDays, setStayForNoDays] = useState(null);
  const [datesAvailabilityCheck, setDatesAvailabilityCheck] = useState(false);

  const checkoutLoginButton = user?.email
    ? "Reserve"
    : "Login to reserve the property";

  const handleReserve = async () => {
    setDatesAvailabilityCheck(true);
    // -- property_Id , tenant , startDate , endDate
    try {
      const { iso_from_Date, iso_to_Date } = formaDatesAndGetDaysDifference(
        date?.from,
        date?.to,
        true
      );

      

      const { success } = await checkAvailability(
        propertyId,
        iso_from_Date,
        iso_to_Date
      );

      if (!success) {
        // @TODO :-- Add a toast to show the available dates for the property
      }

      // ----@TODO:-- Let make this page a stripe checkout session page
      else {
        const propertyImages = propertyData.images.map((image) => {
          return image.url;
        });

        const { url } = await stripePaymentCheckout(
          propertyId,
          propertyData.title,
          propertyData.description,
          propertyImages,
          stayForNoDays * propertyData.price,
          user?.accessToken,
          iso_from_Date,
          iso_to_Date
        );

        window.location.href = url;
      }

      // navigate('/SuccessFullCheckOut',{state:{propertyId:propertyId,startDate:iso_from_Date,endDate:iso_to_Date}})
    } finally {
      setDatesAvailabilityCheck(false);
    }
  };

  useEffect(() => {
    const fetchSingleProperty = async () => {
      setPropertyData({ ...propertyData, isloading: true });
      const data = await getSingleProperty(propertyId);
      setPropertyData({ ...data, isloading: false });
    };

    fetchSingleProperty();
  }, [propertyId]);

  useEffect(() => {
    if (date?.from && date.to) {
      const days = formaDatesAndGetDaysDifference(date?.from, date?.to);
      setStayForNoDays(days);
    }
  }, [date]);

  return (
    // @TODO:- Manage a state for Header because header for home page is different and for others its different
    // @TODO:- Remove the className for the div because it is already present in SiteLayout once you finish with Header state management
    <SiteLayout  >
      {propertyData?.isloading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <span className="text-3xl font-bold text-neutral-800">
            {propertyData?.title}
          </span>
          {/* ---Photos Screen */}
          <div className="grid grid-cols-2 space-x-2 mt-5 relative">
            {propertyData?.images?.length > 0 && (
              <div className="image_container">
                <img
                  src={propertyData?.images[0]?.url}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <div className="image_hover_bg"></div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {propertyData?.images?.slice(1).map((image, index) => (
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
                  {propertyData?.title}
                </span>
                <span className="text-xl">
                  {propertyData?.totalGuests} guests .{" "}
                  {propertyData?.rooms_beds?.rooms} bedrooms .{" "}
                  {propertyData?.rooms_beds?.beds} beds .{" "}
                  {propertyData?.rooms_beds?.bathrooms}{" "}
                  {propertyData?.rooms_beds?.bathrooms > 1
                    ? "bathrooms"
                    : "bathroom"}
                </span>
              </div>
              {/* Additional content */}
            </div>

            {/* ---RIGHT SIDE CHECKOUT BUTTON */}
            {/* @TODO:- create a separate component for checkout card and send propertyData , staysForNoDays  , date , setDate , checkoutLoginButton */}
            <CheckOutCard
              date={date}
              setDate={setDate}
              user={user}
              propertyData={propertyData}
              stayForNoDays={stayForNoDays}
              checkoutLoginButton={checkoutLoginButton}
              handleReserve={handleReserve}
              datesAvailabilityCheck={datesAvailabilityCheck}
            />
          </div>
        </div>
      )}
    </SiteLayout>
  );
};

export default SinglePropertyPage;
