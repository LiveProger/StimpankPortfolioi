import React, { useEffect, useState } from "react";
import "../styles/loading-screen.styl";

export default function LoadingScreen() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Начинаем анимацию ворот через 2.5 сек
    const timeout = setTimeout(() => setAnimate(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loading-screen">
      <div className="gear">⚙</div>
      <div className="gate-text">LOADING...</div>
      <div className={`gate left-gate ${animate ? "slide-left" : ""}`}></div>
      <div className={`gate right-gate ${animate ? "slide-right" : ""}`}></div>
    </div>
  );
}
