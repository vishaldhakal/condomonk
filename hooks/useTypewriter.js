import { useEffect, useState } from "react";

export const useTypewriter = (text, speed = 100, loop = false) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, loop]);

  return displayed;
};
