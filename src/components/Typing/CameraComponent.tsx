import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const CameraComponent = ({ isGameStarted ,countFaults}: { isGameStarted: boolean ,countFaults:()=> void}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isCheating, setIsCheating] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const getCamera = async () => {
    const stream=await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    return stream;
  };
  //when the game is started and socket exist , send the frame to the server
  const sendFrame=useCallback(function () {
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
      if (blob && isGameStarted && socket?.readyState===1) {
        socket.send(blob);
      }
    }, "image/jpeg");
  },[socket,isGameStarted]);
  // function sendFrame() {
  //   //used canvas to send blob object
  //   if (!videoRef.current) return;
  //   const canvas = document.createElement("canvas");
  //   canvas.width = videoRef?.current?.videoWidth || 0;
  //   canvas.height = videoRef?.current?.videoWidth || 0;
  //   const context = canvas.getContext("2d");
  //   context?.drawImage(
  //     videoRef.current,
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );
  //   canvas.toBlob(function (blob) {
  //     if (blob && isGameStarted && socket?.readyState===1) {
  //       socket.send(blob);
  //     }
  //   }, "image/jpeg");
  // }
  useEffect(() => {
    //used to connect to the websocket server once the component is mounted
      const websocket = new WebSocket(import.meta.env.VITE_WS_URL as string);
      setSocket(websocket);
      websocket.onopen = () => {
        console.log("Websocket connected");
      };
      websocket.onerror = () => {
        toast.error("Error in socket connection");
      }; 
  }, []);
  useEffect(() => {
    console.log("isGameStarted", isGameStarted);
    try {
      if (isGameStarted && socket) {
        
        socket.onmessage = () => {
          toast.error("Looking at Keyboard ! Points will be reduced", {
            position: "top-center",
          });
          countFaults();
          setIsCheating(true);
          const id = setTimeout(() => {
            setIsCheating(false);
          }, 500);
          if (!isCheating) {
            clearTimeout(id);
          }
        };
      }
      getCamera();
      if(videoRef.current && socket){
        socket.binaryType = "arraybuffer";
        videoRef.current.addEventListener("play", function () {
          const id=setInterval(sendFrame, 100);
          if(!isGameStarted) clearInterval(id);
        });
      }
    } catch (e) {
      console.log("Error in webcam access: ", e);
    }
    return () => {
      if (socket) socket.close();
    };
  }, [isGameStarted]);
  return (
    <div>
      <p className="text-red-600 font-extrabold text-xl h-7">
        {isCheating && "Don't Look at keyboard!"}
      </p>
      <video
        ref={videoRef}
        className={clsx(
          "absolute bottom-0 right-0 w-[250px] h-auto border-2 border-white",
          isCheating && "border-red-500 object-cover"
        )}
      ></video>
    </div>
  );
};

const MemoizedCameraComponent = React.memo(CameraComponent);
export default MemoizedCameraComponent;
