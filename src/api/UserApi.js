import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


export const verifyEmail = async(email)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/register`,{email: email})
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const verifyOTP = async(email,otp)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/verify-otp`,{email: email , otp: otp})
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const setPassworrd = async(email,password)=>{
    try {
       const response =  await axios.post(`${API_BASE_URL}/set-user-password`,{email:email,password:password})
       return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const loginUser = async(email,password)=>{
    try {
       const response =  await axios.post(`${API_BASE_URL}/login`,{email:email,password:password})
       return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

