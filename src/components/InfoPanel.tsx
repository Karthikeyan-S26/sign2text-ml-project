
import React from "react";
import { Brain, Camera, Hand } from "lucide-react";

const InfoPanel: React.FC = () => (
  <section className="max-w-3xl mx-auto mt-8 mb-6 p-6 rounded-xl bg-card shadow-md grid gap-6 md:grid-cols-3 text-center select-none">
    <div className="flex flex-col items-center gap-2">
      <Camera size={32} className="text-primary mb-1" />
      <span className="font-bold">Enable Webcam</span>
      <span className="text-muted-foreground text-sm">Your hand signs are captured live from your camera for recognition.</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Hand size={32} className="text-primary mb-1" />
      <span className="font-bold">Sign in View</span>
      <span className="text-muted-foreground text-sm">Hold your hand up and show a sign clearly within the video area.</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Brain size={32} className="text-primary mb-1" />
      <span className="font-bold">AI Decodes Your Signs</span>
      <span className="text-muted-foreground text-sm">The system will recognize your gesture and display the text in real time.</span>
    </div>
  </section>
);

export default InfoPanel;
