import React, { useEffect, useState } from 'react';

const OpenEnded = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChange = (e) => {
    const text = e.target.value;
  console.log(text);
  };
  const borderColor = isFocused ? "#00a4e4" : "#ccc";


  return (
    <div className="mt-1 pl-[1.2rem] pr-5 py-3  w-11/12 h-[11rem] overflow-hidden">

              <textarea
                name="text"
                rows="4"
                cols="50"
                id="myTextarea"
                className="w-[99%] px-4 py-1 text-base leading-[1.5rem]  text-left break-words"
                style={{
                  border: `1px solid ${borderColor}`,
                  boxSizing: "border-box",
                  resize: "none",
                  overflow: "auto",
                  outline: "none",
                  transition: "border-color 0.2s ease-in-out",
                }}
                placeholder="Düşüncelerinizi yazınız..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                onChange={handleChange}
              />
           

    </div>
  );
};

export default OpenEnded;