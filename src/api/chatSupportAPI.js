import axios from "axios";
import { API_BASE_URL,ACCESS_TOKEN } from ".";

export const chatSupportAPI={
    connectToRoom:async ()=>{
        try {
            const response = await axios.get(`${API_BASE_URL}/client/chat-support/connect-to-room/`, {
            // headers: {
            //     Authorization: `Bearer ${ACCESS_TOKEN}`,
            // },
          });
          return response.data;
        } catch (error) {
            console.error("Error connecting to chat room:", error);
            throw new Error("Error connecting to chat room")
        }
    },
    chatRoomConversation: async ()=>{

    }
}