import axios from "axios";
import { API_BASE_URL,ACCESS_TOKEN } from ".";

export const VendorAPI = {
  getTop8FoodItemSuggestions: async (query) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/client/food-items/get-top-8-food-item-suggestions/?query=${query}`
      ,{
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Error sending OTP");
    }
  },

// vendor food items api
  getVendorFoodItems: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/client/vendor/food-items/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data
    } 
    catch (error) {
      console.error("Error getting vendor food items:", error);
      throw new Error("Error getting vendor food items")
    }
    
    
},
addVendorFoodItem:async (data)=>{
    console.log(data);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/client/vendor/food-items/`,data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    
      });
      return response.data;
    } catch (error) {
      console.error("Error adding vendor food item:", error);
      throw new Error("Error adding vendor food item")
    }
},
deleteVendorFoodItem: async (id)=>{
    try {
      const response = await axios.delete(`${API_BASE_URL}/client/vendor/food-items/${id}/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting vendor food item:", error);
      throw new Error("Error deleting vendor food item")
    }
}
,
//vendor profile api
getVendorProfile:async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/client/vendor/vendor-profile/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting vendor profile:", error);
      throw new Error("Error getting vendor profile")
    }
},
updateVendorProfile: async (data) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/client/vendor/vendor-profile/`, 
        data, 
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating vendor profile:", error);
      throw new Error("Error updating vendor profile");
    }
  },

  //vendor images api
  getVendorImages:async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/client/vendor/vendor-images/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting vendor images:", error);
      throw new Error("Error getting vendor images")
    }
  },
  addVendorImage:async (data)=>{
    try {
      const response = await axios.post(`${API_BASE_URL}/client/vendor/vendor-images/`,data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    
      });
      return response.data;
    } catch (error) {
      console.error("Error adding vendor image:", error);
      throw new Error("Error adding vendor image")
    }
  },
  deleteVendorImage: async (id)=>{
    try {
      const response = await axios.delete(`${API_BASE_URL}/client/vendor/vendor-images/${id}/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting vendor image:", error);
      throw new Error("Error deleting vendor image")
    }
  },

  //support api
  getGeneralIssues: async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/support/general-issues/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting general issues:", error);
      throw new Error("Error getting general issues")
    }
  },
  raiseTicket:async (data)=>{
    try {
      const response = await axios.post(`${API_BASE_URL}/client/support/raise-ticket/`,data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error raising ticket:", error);
      throw new Error("Error raising ticket")
    }
  }

}