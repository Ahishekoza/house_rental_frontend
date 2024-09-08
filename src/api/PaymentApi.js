import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const stripePaymentCheckout = async (
  propertyId,
  propertyName,
  propertyDescription,
  propertyImages,
  totalAmount,
  token
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-checkout-session`,
      {
        propertyId,
        propertyName,
        propertyDescription,
        propertyImages,
        totalAmount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error Fetching single property", error);
    throw new Error(error.message);
  }
};
