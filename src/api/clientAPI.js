import axios from "axios";
import { API_BASE_URL,ACCESS_TOKEN } from ".";

export const clientAPI = {
 getPopularFoodItems:async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/food-items/get-popular-food-items/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting general issues:", error);
        throw new Error("Error getting general issues")
 }},
 getNearbyYou: async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-nearby-vendors/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting nearby food items:", error);
        throw new Error("Error getting nearby food items")
 }},
 exploreNearbyVendors: async()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/explore-nearby-vendors/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error exploring nearby vendors:", error);
        throw new Error("Error exploring nearby vendors")
 }
},
 getVendorsWithOffer: async ()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-vendors-with-offers/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting vendors with offer:", error);
        throw new Error("Error getting vendors with offer")
 }


},
getTop10FoodItemSuggestions: async (query)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/food-items/get-top-10-food-item-suggestions/?query=${query}`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting top 10 food item suggestions:", error);
        throw new Error("Error getting top 10 food item suggestions")
 }
},
searchFoodByItem:async (item_id)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/food-items/search-by-food-item/?food_item_id=${item_id}`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error searching food by item:", error);
        throw new Error("Error searching food by item")
 }
},
getVendorProfile:async (vendor_id)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-vendor-profile/${vendor_id}/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting vendor profile:", error);
        throw new Error("Error getting vendor profile")
 }
},
getVendorFoodItems: async (vendor_slug)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-vendor-food-items/${vendor_slug}/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting vendor food items:", error);
        throw new Error("Error getting vendor food items")
 }
},
getVendorRatings: async (vendor_slug)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-vendor-ratings/${vendor_slug}/`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting vendor ratings:", error);
        throw new Error("Error getting vendor ratings")
 }
},
rateVendor: async (data)=>{
    try {
        const response = await axios.post(`${API_BASE_URL}/client/vendor/rate-vendor/`, data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
      });
        return response.data;
      } catch (error) {
        console.error("Error rating vendor:", error);
        throw new Error("Error rating vendor")
 }
},
getPopularFoodItemVendorsList: async (id,page)=>{
    try {
        const response = await axios.get(`${API_BASE_URL}/client/vendor/get-popular-food-item-vendors/${id}/?page=${page}`, {
        });
        return response.data;
      } catch (error) {
        console.error("Error getting popular food item vendors:", error);
        throw new Error("Error getting popular food item vendors")
 }
},
discoverLocalVendors :async (filters) => {
    console.log(filters);
    const queryString = Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    console.log(queryString);
    
    try {
    
      const response = await axios.get(`${API_BASE_URL}/client/vendor/discover-local-vendors/?${queryString}`);
  
    
      return response.data;
    } catch (error) {
      console.error("Error getting popular food item vendors:", error);

      
      throw new Error("Error getting popular food item vendors");
    }
}
  
}