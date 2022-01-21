import React, { useState, useEffect } from "react";
import "./Stepper.scss";
import sound from "../../assets/music/mixkit-long-pop-2358.wav";
import NotificationImage from "../../assets/images/Tea.jfif";

// Websockets
import { Client } from "@stomp/stompjs";

const Stepper = () => {
  // eslint-disable-next-line no-unused-vars
  const [stepper, setStepper] = useState(["one", "two", "three", "four"]);
  const [currentStep, setCurrentStep] = useState(0);
  const [timers, setTimers] = useState([]);

  const [audio] = useState(new Audio(sound));

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < stepper.length - 1 ? prev + 1 : prev));
  };

  useEffect(() => {
    const setTimer = async () => {
      let curStep = 0;
      while (curStep <= stepper.length - 1) {
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve) => {
          let timer;
          timer = setTimeout(() => {
            handleNextStep();
            curStep++;
            resolve(true);
          }, 2000);
          setTimers((prev) => [...prev, timer]);
        });
      }
    };

    setTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("I got permission");
      } else if (permission === "denied") {
        alert("Accept notification permission to continue");
      }
    });
  };

  // WebSockets
  useEffect(() => {
    const onConnected = () => {
      console.log("Connected");
      client.subscribe("/topic/message", function (msg) {
        if (msg.body) {
          const jsonBody = JSON.parse(msg.body);
          console.log(jsonBody);
          handleSendNotification();
        }
      });
    };

    const onDisconnected = () => {
      // console.log('Disconnected!!')
    };

    const BACKEND_URL =
      "http://ec2-3-109-105-151.ap-south-1.compute.amazonaws.com:8072";

    const BROKER_URL =
      process.env.NODE_ENV === "production"
        ? `${BACKEND_URL?.replace("https", "wss")}/notification`
        : `${BACKEND_URL?.replace("http", "ws")}/notification`;

    const client = new Client({
      brokerURL: BROKER_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
    });

    client.activate();
  }, []);

  const handleSendNotification = () => {
    if (Notification.permission === "granted") {
      try {
        const notification = new Notification("New Order", {
          body: "New order has been placed",
          image: NotificationImage,
          icon: NotificationImage,
          requireInteraction: true,
          timestamp: Math.floor(new Date()),
          vibrate: [200, 100, 200],
        });

        notification.onclick = (e) => {
          e.preventDefault();
          window.open("/stepper");
        };

        audio.play();
      } catch (err) {
        console.log(err);
      }
    } else {
      getNotificationPermission();
    }
  };

  return (
    <div>
      <div className="stepper-container">
        {stepper.map((step, index) => {
          return (
            <React.Fragment key={index}>
              <span
                className={`step ${currentStep > index ? "completed" : ""} ${
                  currentStep === index ? "current-step" : ""
                }`}
              ></span>
              {index !== stepper.length - 1 && (
                <span
                  className={`line ${currentStep > index ? "active" : ""}`}
                ></span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <button onClick={handlePrevStep}>Prev step</button>

      <button onClick={handleNextStep}>Next step</button>

      <br />
      <br />
      <br />
      <br />
      <br />

      <button onClick={handleSendNotification}>Send notification</button>
    </div>
  );
};

export default Stepper;
