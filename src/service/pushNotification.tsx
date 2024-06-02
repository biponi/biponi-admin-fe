import { useEffect } from "react";

import { PushNotifications } from "@capacitor/push-notifications";
import { sendTokensToServer } from "./firebaseRequestPermission";

const PushNotificationHook = () => {
  useEffect(() => {
    // Request notification permission (optional)
    registerNotifications();
    addListeners();
    //eslint-disable-next-line
  }, []);

  const addListeners = async () => {
    await PushNotifications.addListener("registration", async (token) => {
      console.info("Registration token: ", token.value);

      await sendTokensToServer(token.value, [
        "product-add",
        "manufacturer-add",
        "order-creation",
        "general",
      ]);
    });

    await PushNotifications.addListener("registrationError", (err) => {
      console.error("Registration error: ", err.error);
    });

    await PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push notification received: ", notification);
      }
    );

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log(
          "Push notification action performed",
          notification.actionId,
          notification.inputValue
        );
      }
    );
  };

  //   const subscribeToTopics = async (token: string, topic: string) => {
  //     try {
  //       const response = await fetch(config.notification.setFcmToken(), {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ token, topic }),
  //       });

  //       if (response.ok) {
  //         console.log("Token saved and subscribed to topic successfully");
  //       } else {
  //         console.error("Failed to subscribe to topic");
  //       }
  //     } catch (error) {
  //       console.error("Error subscribing to topic:", error);
  //     }
  //   };

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
      getDeliveredNotifications();
    }

    if (permStatus.receive !== "granted") {
      console.error("User denied permissions!");
    }

    await PushNotifications.register();
  };

  const getDeliveredNotifications = async () => {
    const notificationList =
      await PushNotifications.getDeliveredNotifications();
    console.log("delivered notifications", notificationList);
  };
};

export default PushNotificationHook;
