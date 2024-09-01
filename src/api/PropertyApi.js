import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProperties = async (query) => {
  const params = new URLSearchParams();

  // ---query for properties
  if (query?.country) {
    params.set("country", query.country);
  }

  if (query?.totalGuests) {
    params.set("totalGuests", query.totalGuests);
  }

  // ---query for features
  if (query?.features) {
    params.set("features", query.features);
  }

  //  ---query for filters/---propertyType
  if (query?.propertyType) {
    params.set("propertyType", query.propertyType);
  }


  try {
    const response = await axios.get(
      `${API_BASE_URL}/properties?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log("Error Fetching properties", error);
    throw new Error(error.message);
  }
};

export const getSingleProperty = async(propertyId)=>{
  try {
   const {data} =  await axios.get(`${API_BASE_URL}/properties/${propertyId}`)
   return data
  } catch (error) {
    console.log("Error Fetching single property", error);
    throw new Error(error.message);
  }
}