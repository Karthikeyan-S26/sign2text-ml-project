
import React, { useState } from "react";
import WebcamFeed from "../components/WebcamFeed";
import PredictionBox from "../components/PredictionBox";
import InfoPanel from "../components/InfoPanel";
import { toast } from "@/hooks/use-toast";
import { Play, Pause } from "lucide-react";

const Index = () => {
  const [enabled, setEnabled] = useState(true);
  // For demo: switch between mock signs
  const [prediction, setPrediction] = useState<string | null>(null);

  // "Demo mode": cycle through A, B, C, "Hello", etc.
  React.useEffect(() => {
    if (!enabled) {
      setPrediction(null);
      return;
    }
    let idx = 0;
    const labels = ["Hello", "A", "B", "C", "How are you?", "Thank you"];
    setPrediction(labels[0]);
    const interval = setInterval(() => {
      setPrediction(labels[(++idx) % labels.length]);
    }, 2000);
    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <main className="min-h-screen w-full bg-background pb-8 pt-6 flex flex-col items-center justify-start animate-fade-in">
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-primary to-accent-foreground text-transparent bg-clip-text drop-shadow-lg mt-2 mb-2">
        Sign2Text
      </h1>
      <div className="text-lg mb-6 text-muted-foreground font-medium max-w-2xl text-center">
        Real-Time Sign Language to Text Conversion using Machine Learning
      </div>

      <div className="mt-4 w-full flex justify-center">
        <WebcamFeed enabled={enabled} />
      </div>
      <div className="flex flex-row gap-4 items-center justify-center mt-5 mb-2">
        <button
          onClick={() => {
            setEnabled((en) => !en);
            toast({
              title: !enabled ? "Webcam enabled" : "Webcam disabled",
              description: !enabled
                ? "Video sign detection is now active."
                : "Sign detection paused.",
            });
          }}
          className={`flex flex-row gap-1 items-center px-5 py-2 rounded-lg border bg-secondary text-primary font-semibold shadow-md hover:scale-105 transition active:scale-95 ${
            enabled ? "" : "opacity-70"
          }`}
        >
          {enabled ? (
            <>
              <Pause className="w-5 h-5" /> Pause Recognition
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> Resume Recognition
            </>
          )}
        </button>
      </div>

      <PredictionBox prediction={prediction} />

      <InfoPanel />

      <section className="max-w-2xl mx-auto mt-2 p-4 rounded-xl bg-popover/80 shadow border mb-8">
        <h2 className="font-semibold mb-2 text-xl">About the Project</h2>
        <p className="text-muted-foreground text-base mb-2">
          <b>Sign2Text</b> is a real-time sign language recognition system that transforms your hand signs, captured via webcam, into meaningful text using advanced vision and AI models. The project aims to bridge communication barriers and make digital spaces accessible for the hearing-impaired community.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground px-2 list-disc list-inside">
          <li>🖐️ Recognizes static and dynamic hand gestures.</li>
          <li>📝 Generates text output instantly and clearly.</li>
          <li>⚡ Lightweight & fast; suitable for low-resource devices.</li>
          <li>🌍 Extensible for multiple sign languages, TTS, and more.</li>
        </ul>
      </section>
      <footer className="text-xs text-muted-foreground mt-6 pb-2 text-center w-full">
        &copy; {new Date().getFullYear()} Sign2Text &middot; Designed with ❤️ for accessibility.
      </footer>
    </main>
  );
};

export default Index;
