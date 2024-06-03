"use client";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleScroll = () => {
    if (window) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScrollListener = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScrollListener);

    return () => {
      window.removeEventListener("scroll", handleScrollListener);
    };
  }, []);

  return (
    <div
      onClick={handleScroll}
      className={` ${
        !isVisible ? "hidden" : "visible"
      } fixed bottom-5 right-5 cursor-pointer p-3 bg-mainBg text-white border border-slate-700 rounded-full `}
    >
      <ArrowDownwardIcon />
    </div>
  );
};

export default ScrollToBottom;
