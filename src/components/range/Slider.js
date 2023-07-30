import React, { useState, useEffect } from "react";
import "./multiRangeSlider.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const MultiRangeSlider = ({ value, min, max, handleChange }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const handleMinChange = (event) => {
    const newValue = parseInt(event.target.value);
    setMinValue(newValue);
    handleChange([newValue, maxValue]);
  };

  const handleMaxChange = (event) => {
    const newValue = parseInt(event.target.value);
    setMaxValue(newValue);
    handleChange([minValue, newValue]);
  };

  return (
    <>
      <RangeSlider
        id="range-slider-yellow"
        min={min}
        max={max}
        value={value}
        defaultValue={value}
        onInput={handleChange}
      />
      <div className="slider-wrapper">
        <div className="first">
          <input
            type="number"
            value={minValue}
            min={min}
            placeholder='min'
            max={max}
            onChange={handleMinChange}
          />
        </div>
        <span className="middle">-</span>
        <div className="last">
          <input
            type="number"
            value={maxValue}
            min={min}
            placeholder='max'
            max={max}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </>
  );
};

export default MultiRangeSlider;
