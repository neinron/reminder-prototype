import React, { useState, useEffect, useMemo } from "react";
import { Input } from "./input";

export interface LicensePlateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: { target: { value: string }, city?: string, rest?: string }) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const LicensePlateInput = React.forwardRef<HTMLInputElement, LicensePlateInputProps>(
  ({ value = "", onChange, className, style, id }, ref) => {
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
      const val = e.target.value.toUpperCase().replace(/[^A-Z0-9ÄÖÜ]/g, "").slice(0, 8);
      setRest(val);
      if (onChange) onChange({ target: { value: `${city}${val ? " " + val : ""}` }, city, rest: val });
    }

    // Dynamically calculate total width
    const containerWidth = useMemo(() => {
      const cityWidth = Math.max(1.2, city.length) * 1.3;  // in ch units
      const restWidth = Math.max(5.2, rest.length) * 1.3;  // in ch units
      const paddingCh = 7; // EU bar + separator + margins
      const chUnitPx = 17.3; // approximate px per "ch" at 3rem font
      return (cityWidth + restWidth + paddingCh) * chUnitPx;
    }, [city, rest]);

    return (
      <div
        className="flex items-center license-plate-container transition-all duration-200"
        style={{
          width: containerWidth,
          height: 60,
          background: "#fff",
          border: "2px solid #222",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.05)",
          ...style,
        }}
      >
        {/* EU blue bar */}
        <div
          className="flex flex-col items-center justify-center"
          style={{
            width: 36,
            height: "100%",
            background: "#5046E7",
            color: "#fff",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <img src="/stars.png" alt="EU Stars" style={{ width: 18, height: 18, marginTop: 7 }} />
          <span style={{ fontWeight: "bold", fontSize: 18, fontFamily: 'Inter, Arial, sans-serif' }}>D</span>
        </div>

        {/* City input */}
        <div className="relative inline-block">
          <Input
            id={id ? id + "-city" : undefined}
            value={city}
            onChange={handleCityChange}
            placeholder="M"
            maxLength={3}
            inputMode="text"
            className="h-12 font-bold text-center bg-white mr-1 ml-2 placeholder:text-gray-400 px-1 rounded-md"
            style={{
              fontFamily: 'inherit',
              letterSpacing: 2,
              fontSize: '3rem',
              width: `${Math.max(1.2, city.length) * 1.3}ch`,
              transition: "width 0.2s ease",
            }}
            autoComplete="off"
          />
        </div>

        {/* Separator dots */}
        <div className="flex flex-col items-center mx-1 gap-1" style={{height: '3rem', justifyContent: 'center'}}>
          <span className="w-5 h-5 bg-gray-200 rounded-full inline-block" />
          <span className="w-5 h-5 bg-gray-200 rounded-full inline-block" />
        </div>

        {/* Rest input */}
        <div className="relative inline-block min-w-0">
          <Input
            id={id ? id + "-rest" : undefined}
            value={rest}
            onChange={handleRestChange}
            placeholder="AB1234"
            maxLength={7}
            inputMode="text"
            className="h-12 font-bold text-center bg-white mr-0 ml-1 placeholder:text-gray-400 px-1 rounded-md"
            style={{
              fontFamily: 'inherit',
              letterSpacing: 2,
              fontSize: '3rem',
              width: `${Math.max(5.5, rest.length) * 1.3}ch`,
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