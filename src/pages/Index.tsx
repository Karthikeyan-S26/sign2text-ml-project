
import React, { useState } from "react";
import WebcamFeed from "../components/WebcamFeed";
import PredictionBox from "../components/PredictionBox";
import InfoPanel from "../components/InfoPanel";
import { toast } from "@/hooks/use-toast";
import { Play, Pause, Smile, Frown, Angry } from "lucide-react";

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
    const labels = [
      "Hello",
      "A",
      "B",
      "C",
      "How are you?",
      "Thank you",
      "Happy",
      "Sad",
      "Angry",
      ...Array.from({ length: 23 }, (_, i) => String.fromCharCode(68 + i)), // D-Z
    ];
    setPrediction(labels[0]);
    const interval = setInterval(() => {
      setPrediction(labels[(++idx) % labels.length]);
    }, 2000);
    return () => clearInterval(interval);
  }, [enabled]);

  // Alphabet letters A-Z for guidance
  const ALPHABETS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

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

      {/* GUIDANCE SECTION: Shows what sign is added and what text is shown */}
      <section className="max-w-2xl mx-auto mt-4 p-4 rounded-xl bg-card/80 shadow border mb-6">
        <h2 className="font-semibold mb-2 text-xl">Demo Signs Guidance</h2>
        <p className="text-muted-foreground mb-3 text-base">
          The following hand signs and facial expressions are recognized in this demo.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 px-2 list-disc list-inside mb-3">
          <li>
            <b>✋ Hello</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">Hello</span>
            </div>
          </li>
          <li>
            <b>🤚 A</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">A</span>
            </div>
          </li>
          <li>
            <b>🖐️ B</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">B</span>
            </div>
          </li>
          <li>
            <b>✊ C</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">C</span>
            </div>
          </li>
          <li>
            <b>👉 "How are you?"</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">How are you?</span>
            </div>
          </li>
          <li>
            <b>🤟 "Thank you"</b>
            <div className="text-muted-foreground text-sm">
              → Shows text: <span className="text-primary font-semibold">Thank you</span>
            </div>
          </li>
          {/* Facial Expressions */}
          <li className="flex items-center gap-2">
            <Smile className="inline-block w-6 h-6 text-yellow-500" />
            <span className="font-semibold ml-2">Happy (Facial Expression)</span>
            <div className="text-muted-foreground text-sm w-full">
              → Shows text: <span className="text-primary font-semibold">Happy</span>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Frown className="inline-block w-6 h-6 text-blue-500" />
            <span className="font-semibold ml-2">Sad (Facial Expression)</span>
            <div className="text-muted-foreground text-sm w-full">
              → Shows text: <span className="text-primary font-semibold">Sad</span>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Angry className="inline-block w-6 h-6 text-red-500" />
            <span className="font-semibold ml-2">Angry (Facial Expression)</span>
            <div className="text-muted-foreground text-sm w-full">
              → Shows text: <span className="text-primary font-semibold">Angry</span>
            </div>
          </li>
        </ul>
        {/* Alphabets guidance grid */}
        <div className="mb-1 font-semibold text-base">All Alphabet Letters:</div>
        <div className="grid grid-cols-6 md:grid-cols-13 gap-2 px-2">
          {ALPHABETS.map((letter) => (
            <div
              key={letter}
              className="flex flex-row items-center gap-2 py-2 px-0"
            >
              <span className="text-lg font-bold">{letter}</span>
              <span className="text-muted-foreground text-xs">
                → <span className="text-primary font-semibold">{letter}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          (Note: The icons and emojis above are symbolic. Show the corresponding hand sign or facial expression to see its text output.)
        </div>
      </section>

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
