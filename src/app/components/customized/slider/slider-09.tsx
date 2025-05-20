import React from "react";
import { Slider } from "@/components/ui/slider";

interface SliderMarksDemoProps extends React.ComponentProps<typeof Slider> {
  labels: string[];
}

export default function SliderMarksDemo({ labels, thumbSizePx = 24, ...sliderProps }: SliderMarksDemoProps & { thumbSizePx?: number }) {
  // Track width for max-w-sm is 384px
  const trackWidthPx = 384;
  const offsetPercent = (thumbSizePx / 2 / trackWidthPx) * 100;

  return (
    <div className="w-full max-w-lg relative">
      <Slider {...sliderProps} max={labels.length > 1 ? labels.length - 1 : 1} step={1} />
      <div className="mt-2 relative w-full" style={{ height: 18 }}>
        {labels.map((label, i) => {
          // If only one label, center it
          const left =
            labels.length === 1
              ? 50
              : offsetPercent + (i / (labels.length - 1)) * (100 - 2 * offsetPercent);
          return (
            <span
              key={label}
              className="absolute flex items-center justify-center px-2 py-0.5 bg-white rounded text-sm"
              style={{
                left: `${left}%`,
                transform: "translateX(-50%)",
                minWidth: 28,
                boxSizing: "border-box",
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
