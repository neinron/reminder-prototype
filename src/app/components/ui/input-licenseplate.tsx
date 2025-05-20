import React, { useState, useEffect, useMemo } from "react";
import { Input } from "./input";

export interface LicensePlateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: { target: { value: string }, city?: string, rest?: string }) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  gap?: number;
  inputHeight?: number; // px
}

export const LicensePlateInput = React.forwardRef<HTMLInputElement, LicensePlateInputProps>(
  ({ value = "", onChange, className, style, id, gap = 8, inputHeight = 48 }, ref) => {
    const [city, setCity] = useState("");
    const [rest, setRest] = useState("");

    useEffect(() => {
      const match = value.trim().match(/^([A-ZÄÖÜ]{1,3})\s*(.*)$/i);
      setCity(match ? match[1].toUpperCase() : "");
      setRest(match && match[2] ? match[2].toUpperCase() : "");
    }, [value]);

    function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value.toUpperCase().replace(/[^A-ZÄÖÜ]/g, "").slice(0, 3);
      setCity(val);
      if (onChange) onChange({ target: { value: `${val}${rest ? " " + rest : ""}` }, city: val, rest });
    }
    function handleRestChange(e: React.ChangeEvent<HTMLInputElement>) {
      let val = e.target.value.toUpperCase().replace(/[^A-Z0-9ÄÖÜ]/g, "").slice(0, 8);
      
      // Find the position where letters end and numbers begin
      const lettersEnd = val.search(/\d/);
      if (lettersEnd !== -1) {
        // Add space between letters and numbers if not already present
        if (val[lettersEnd - 1] !== ' ') {
          val = val.slice(0, lettersEnd) + ' ' + val.slice(lettersEnd);
        }
      } else {
        // Remove any spaces if no numbers are present
        val = val.replace(/\s/g, '');
      }

      setRest(val);
      if (onChange) onChange({ target: { value: `${city}${val ? " " + val : ""}` }, city, rest: val });
    }

    // Dynamically calculate dynamic input widths based on content
    const chUnitPx = 0.55 * inputHeight; // empirically, 1ch ≈ 0.62*height at 3rem
    const minCityCh = 2;
    const maxCityCh = 3.8;
    const minRestCh = 6.7;
    const maxRestCh = 8;
    const cityChMultiplier = 1.3; // Multiplier for city input width
    const cityInputWidth = Math.max(minCityCh, Math.min(maxCityCh, (city.length || 1) * cityChMultiplier)) * chUnitPx;
    const restInputWidth = Math.max(minRestCh, Math.min(maxRestCh, rest.length || 2)) * chUnitPx;
    const dotWidth = inputHeight * 0.42;
    const badgeWidth = 35;
    const containerWidth = badgeWidth + gap + cityInputWidth + gap + dotWidth + gap + restInputWidth + gap +2;

    return (
      <div
        className="flex items-center license-plate-container transition-all duration-200"
        style={{
          width: containerWidth,
          height: inputHeight + gap * 2,
          background: "#fff",
          border: "2px solid #222",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.05)",
          padding: 0,
          ...style,
        }}
      >
        {/* EU blue bar */}
        <div
          className="flex flex-col items-center justify-center"
          style={{
            width: badgeWidth,
            height: inputHeight + gap * 2,
            background: "#5046e8",
            color: "#fff",
            flexShrink: 0,
            position: "relative",
            marginLeft: 0
          }}
        >
          <img src="/stars.png" alt="EU Stars" style={{ width: 18, height: 18, marginTop: 7 }} />
          <span style={{ fontWeight: "bold", fontSize: 18, fontFamily: 'Inter, Arial, sans-serif' }}>D</span>
        </div>

        {/* City input */}
        <div className="relative inline-block" style={{ marginLeft: gap, marginTop: gap, marginBottom: gap }}>
          <Input
            id={id ? id + "-city" : undefined}
            value={city}
            onChange={handleCityChange}
            placeholder="M"
            maxLength={3}
            inputMode="text"
            className="font-bold text-center bg-white placeholder:text-gray-400 rounded-md"
            style={{
              fontFamily: 'inherit',
              letterSpacing: 2,
              fontSize: '3rem',
              width: cityInputWidth,
              minWidth: chUnitPx * minCityCh,
              maxWidth: chUnitPx * maxCityCh,
              height: inputHeight,
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
              transition: "width 0.2s ease",
            }}
            autoComplete="off"
          />
        </div>

        {/* Separator dots */}
        <div className="flex flex-col items-center justify-center" style={{ marginLeft: gap, marginRight: gap, marginTop: gap, marginBottom: gap, height: inputHeight, gap: gap }}>
          <span style={{ width: dotWidth, height: dotWidth }} className="bg-gray-200 rounded-full inline-block" />
          <span style={{ width: dotWidth, height: dotWidth }} className="bg-gray-200 rounded-full inline-block" />
        </div>

        {/* Rest input */}
        <div className="relative inline-block min-w-0" style={{ marginRight: gap, marginTop: gap, marginBottom: gap }}>
          <Input
            id={id ? id + "-rest" : undefined}
            value={rest}
            onChange={handleRestChange}
            placeholder="AB 1234"
            maxLength={7}
            inputMode="text"
            className="font-bold text-center bg-white placeholder:text-gray-400 rounded-md"
            style={{
              fontFamily: 'inherit',
              letterSpacing: 2,
              fontSize: '3rem',
              width: restInputWidth,
              minWidth: chUnitPx * minRestCh,
              maxWidth: chUnitPx * maxRestCh,
              height: inputHeight,
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
              transition: "width 0.2s ease",
            }}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }
);

LicensePlateInput.displayName = "LicensePlateInput";