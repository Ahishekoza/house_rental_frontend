import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProperties = async (query) => {
    const params = new URLSearchParams();
    
    // ---query for properties 
    if (query.country) {
      params.set("country", query.country);
    }    

    if (query.totalGuests) {
      params.set("totalGuests", query.totalGuests);
    }

    // ---query for features
   if(query.features){
    params.set("features", query.features);
   }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/properties?${params.toString()}`
      );
      console.log(response);
    } catch (error) {
      console.log("Error Fetching properties", error);
      throw new Error(error.message);
    }
  };
  

