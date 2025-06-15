
import React, { useRef, useState, useEffect } from "react";

interface WebcamFeedProps {
  onFrame?: (frame: HTMLVideoElement) => void;
  enabled?: boolean;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ onFrame, enabled = true }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    let localStream: MediaStream | null = null;

    async function startVideo() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        setStreaming(true);
      } catch (err) {
        setStreaming(false);
        alert("Could not access webcam. Please check permissions.");
      }
    }

    if (enabled) startVideo();

    return () => {
      setStreaming(false);
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled]);

  // Optionally, can call onFrame at an interval if ML inference is added

  return (
    <div className="relative w-full h-[340px] rounded-xl overflow-hidden bg-black shadow-xl border-4 border-primary max-w-2xl mx-auto">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ background: "#222" }}
      />
      {!streaming && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <span className="text-lg text-white">Webcam off</span>
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;

