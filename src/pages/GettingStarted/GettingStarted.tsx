import { useEffect, useRef, useState } from "react";

const GettingStarted = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStreaming, setVideoStreaming] = useState<boolean>(false);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          setVideoStreaming(true);
          video.play();
        } else {
          alert("Problem in getting the Html to render video");
        }
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="p-4 flex items-center">
        <div className="mx-auto flex items-center space-x-2">
          <div className="font-semibold text-3xl">Getting Started</div>
        </div>
      </header>
      <main className="">
        <video
          ref={videoRef}
          className="w-[500px] h-[500px]  bg-black dark:bg-white absolute right-1/3"
        ></video>
        {!videoStreaming && (
          <p className="relative top-10 z-5 left-1/3 text-white dark:text-black">
            Waiting for the video to connect
          </p>
        )}
      </main>
    </div>
  );
};

export default GettingStarted;
