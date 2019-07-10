import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, close) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      // console.log('Ref', ref , 'Close method:', close)
      close();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function OutsideAlerter({ children, close }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, close);
  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
