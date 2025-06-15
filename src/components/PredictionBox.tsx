
import React from "react";

interface PredictionBoxProps {
  prediction: string | null;
  confidence?: number;
}

const PredictionBox: React.FC<PredictionBoxProps> = ({ prediction, confidence }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 mx-auto p-6 rounded-2xl border-4 border-accent bg-background shadow-lg min-h-[110px] max-w-md transition-all animate-fade-in">
      <span className="text-xl text-muted-foreground tracking-wide mb-2">
        Current Prediction
      </span>
      <span className="text-4xl font-extrabold tracking-wider text-primary animate-pulse transition-all">
        {prediction || <span className="italic text-muted-foreground">Waiting...</span>}
      </span>
      {confidence !== undefined && (
        <span className="mt-1 text-sm text-muted-foreground">
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
      )}
    </div>
  );
};

export default PredictionBox;

