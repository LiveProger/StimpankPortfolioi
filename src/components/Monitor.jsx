import React, { useEffect } from "react";
import "../styles/monitor.styl";

export default function Monitor({ onRendered }) {
  useEffect(() => {
    // Вызовем обратный вызов после того, как компонент отрендерится
    onRendered();
  }, [onRendered]); // Будет вызван, как только компонент отрендерится

  return (
    <div className="monitor">
      <div className="monitor-screen">
        <p>Добро пожаловать в мой стимпанк-завод!</p>
      </div>
    </div>
  );
}
