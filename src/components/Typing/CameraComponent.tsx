import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const CameraComponent = ({ isGameStarted }: { isGameStarted: boolean }) => {
  const [isCheating, setIsCheating] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    try {
      let websocket: WebSocket;
      if (isGameStarted) {
        websocket = new WebSocket("ws://localhost:8765");
        websocket.onopen = () => {
          toast.success("Video is being monitored, don't cheat!");
        };
        websocket.onerror = () => {
          toast.error("Error in websocket connection");
        };
        websocket.onmessage = () => {
          toast.error("Keyboard me mat dekh", {
            position: "top-center",
          });
          setIsCheating(true);
          setTimeout(() => {
            setIsCheating(false);
          }, 500);
        };
      }
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              if (isGameStarted) websocket.binaryType = "arraybuffer";
              videoRef.current.play();
              //send the stream to the server every 0.1s
              videoRef.current.addEventListener("play", function () {
                if (isGameStarted) setInterval(sendFrame, 100);
              });
            }
            function sendFrame() {
              //used canvas to send blob object
              if (!videoRef.current) return;
              const canvas = document.createElement("canvas");
              canvas.width = videoRef?.current?.videoWidth || 0;
              canvas.height = videoRef?.current?.videoWidth || 0;
              const context = canvas.getContext("2d");
              context?.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
              );
              canvas.toBlob(function (blob) {
                if (blob) {
                  websocket.send(blob);
                }
              }, "image/jpeg");
            }
          })
          .catch(function (error) {
            console.log("Something went wrong with webcam access: ", error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [isGameStarted]);
  return (
    <div>
      <video
        ref={videoRef}
        className={clsx(
          "absolute bottom-0 right-0 w-[300px] h-auto border-2 border-white",
          isCheating && "border-red-500 object-cover"
        )}
      ></video>
    </div>
  );
};

const MemoizedCameraComponent = React.memo(CameraComponent);
export default MemoizedCameraComponent;
