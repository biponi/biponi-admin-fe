// src/requestPermission.js

import axiosInstance from "../api/axios";
import config from "../utils/config";
import { messaging, getToken } from "./firebase.config";

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "YBKnEDOoHNFOb2Xl9awjlNNOppmWQIYjvPoBj938bTLjUAdattrlRlu6oz9gsRKvHsufy4A4tl32-R0et7pVUy7s",
    });
    if (token) {
      console.log("Token:", token);
      ["product-add", "manufacturer-add", "order-creation", "general"].forEach(
        async (topic) => await sendTokenToServer(token, topic)
      );
      // Send the token to your server or use it to subscribe to a topic
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};

// export const subscribeToTopic = async () => {
//   ["product-add", "manufacturer-add", "order-creation", "general"];
// };

export const sendTokenToServer = async (token: string, topic: string) => {
  try {
    const response = await axiosInstance.post(
      config.notification.setFcmToken(),
      {
        token,
        topic,
      }
    );

    if (response.status >= 300) {
      console.log("Failed to send token to server");
    }

    console.log("Token sent to server successfully");
  } catch (error) {
    console.error("An error occurred while sending token to server: ", error);
  }
};

export const sendTokensToServer = async (token: string, topics: string[]) => {
  try {
    const response = await axiosInstance.post(
      config.notification.setFcmToken(),
      {
        token,
        topic: topics,
      }
    );

    if (response.status >= 300) {
      console.log("Failed to send token to server");
    }

    console.log("Token sent to server successfully");
  } catch (error) {
    console.error("An error occurred while sending token to server: ", error);
  }
};
