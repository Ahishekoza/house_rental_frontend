import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


export const checkAvailability = async(property_id,startDate,endDate) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/check-availability`,{property_id, startDate, endDate})

        return response.data

    } catch (error) {
        throw new Error(error.message);
        
    }
}

export const rentalProperty = async(property_id,startDate,endDate,tenant)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/rent-property`,{property_id,tenant,startDate,endDate})
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message);
    }
}