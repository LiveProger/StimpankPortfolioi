import React, { useState, useEffect } from "react";
import LoadingGates from "./components/LoadingGates";
import Monitor from "./components/Monitor";

export default function App() {
  const [gatesOpen, setGatesOpen] = useState(false);
  const [monitorRendered, setMonitorRendered] = useState(false); // Состояние для отслеживания рендера монитора

  // Функция для отслеживания рендера монитора
  const handleMonitorRendered = () => {
    setMonitorRendered(true);
  };

  useEffect(() => {
    if (monitorRendered) {
      // Когда монитор отрендерен, запускаем анимацию ворот
      setGatesOpen(true);  // Начинаем анимацию ворот
    }
  }, [monitorRendered]);

  return (
    <div className="app">
      <Monitor onRendered={handleMonitorRendered} />
      {/* Показываем LoadingGates, пока ворота не откроются */}
      <LoadingGates gatesOpen={gatesOpen} />
    </div>
  );
}
