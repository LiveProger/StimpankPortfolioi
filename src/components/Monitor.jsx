import React, { useEffect, useState } from "react";
import "../styles/monitor.styl";
import Keyboard from "./Keyboard";

export default function Monitor({ onRendered }) {
  const [pressedKeys, setPressedKeys] = useState(new Set()); // Храним нажатые клавиши
  const [language, setLanguage] = useState("EN"); // Язык нажатой клавиши

  // Функция для получения нажатых клавиш и их языка
  const getKeys = (keys, currentLanguage) => {
    setPressedKeys(keys);
    setLanguage(currentLanguage); // Обновляем язык
  };

  useEffect(() => {
    // Вызовем обратный вызов после того, как компонент отрендерится
    onRendered();
  }, [onRendered]); // Будет вызван, как только компонент отрендерится

  return (
    <div>
      <div className="monitor">
        <div className="monitor-screen">
          <pre>
            Добро пожаловать в мой стимпанк-завод!
            {""}
          </pre>
          {/* Отображаем нажатые клавиши */}
          <div className="current-language">
            <h4>Текущий язык: {language}</h4>
          </div>
          <div className="pressed-keys">
            <h3>
              Нажатые клавиши:{" "}
              {Array.from(pressedKeys)
                .map((key, index) => (language === "EN" ? key.en : key.ru))
                .join(" ")}
            </h3>
          </div>
        </div>
      </div>
      <Keyboard getKeys={getKeys} />
    </div>
  );
}
