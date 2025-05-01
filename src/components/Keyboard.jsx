import React, { useState, useEffect } from "react";
import "../styles/keyboard.styl";

// Дефолтный набор клавиш для клавиатуры
const keys = [
  [
    { en: "Q", ru: "й" },
    { en: "W", ru: "ц" },
    { en: "E", ru: "у" },
    { en: "R", ru: "к" },
    { en: "T", ru: "е" },
    { en: "Y", ru: "н" },
    { en: "U", ru: "г" },
    { en: "I", ru: "ш" },
    { en: "O", ru: "щ" },
    { en: "P", ru: "з" },
  ],
  [
    { en: "A", ru: "ф" },
    { en: "S", ru: "ы" },
    { en: "D", ru: "в" },
    { en: "F", ru: "а" },
    { en: "G", ru: "п" },
    { en: "H", ru: "р" },
    { en: "J", ru: "о" },
    { en: "K", ru: "л" },
    { en: "L", ru: "д" },
  ],
  [
    { en: "Z", ru: "я" },
    { en: "X", ru: "ч" },
    { en: "C", ru: "с" },
    { en: "V", ru: "м" },
    { en: "B", ru: "и" },
    { en: "N", ru: "т" },
    { en: "M", ru: "ь" },
  ],
];

export default function Keyboard({ getKeys }) {
  const [pressedKeys, setPressedKeys] = useState(new Set()); // Храним все нажатые клавиши
  const [language, setLanguage] = useState("EN"); // Язык нажатой клавиши (по умолчанию английский)

  // Обработчик для нажатия клавиши
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase(); // Берем нажатую клавишу и приводим к верхнему регистру
    // Проверяем, если клавиша существует на нашей клавиатуре, независимо от языка
    const keyFound = keys
      .flat()
      .find((k) => k.en.toUpperCase() === key || k.ru.toUpperCase() === key); // Смотрим, есть ли такая клавиша в нашем списке (независимо от языка)
    if (keyFound) {
      setPressedKeys((prev) => {
        const newPressed = new Set(prev);
        newPressed.add(keyFound); // Добавляем объект клавиши в Set
        return newPressed;
      });

      // Устанавливаем текущий язык
      if (keyFound.en.toUpperCase() === key) {
        setLanguage("EN");
      } else if (keyFound.ru.toUpperCase() === key) {
        setLanguage("RU");
      }
    }
  };

  // Обработчик для отпускания клавиши
  const handleKeyUp = (event) => {
    const key = event.key.toUpperCase(); // Берем символ клавиши при отпускании
    const keyFound = keys
      .flat()
      .find((k) => k.en.toUpperCase() === key || k.ru.toUpperCase() === key);
    if (keyFound) {
      setPressedKeys((prev) => {
        const newPressed = new Set(prev);
        newPressed.delete(keyFound); // Убираем объект клавиши из Set
        return newPressed;
      });
    }
  };

  // Эффект для добавления и удаления обработчиков события
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Отправляем состояние нажатых клавиш наружу
    if (getKeys && pressedKeys) {
      getKeys(pressedKeys, language);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys, getKeys, language]); // Обновляем getKeys при изменении pressedKeys

  return (
    <div className="keyboard">
      <div className="typewriter-background">
        {keys.map((row, rowIndex) => (
          <div className="key-row" key={rowIndex}>
            {row.map((key, keyIndex) => (
              <div
                className={`key ${
                  Array.from(pressedKeys).some(
                    (pressedKey) =>
                      pressedKey.en === key.en && pressedKey.ru === key.ru
                  )
                    ? "pressed"
                    : ""
                }`}
                key={keyIndex}
              >
                <span className="key-en">{key.en}</span>
                <span className="key-ru">{key.ru}</span>
                <div className="key-leg"></div> {/* Ножка для каждой клавиши */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
