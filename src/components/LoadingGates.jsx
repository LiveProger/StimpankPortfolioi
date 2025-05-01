import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import "../styles/loading-gates.styl";

function generateRustyKeyframesSymmetric() {
  const keyframesLeft = [];
  const keyframesRight = [];

  let distanceLeft = 0;
  let distanceRight = 0;
  const totalDistance = 100;

  // Заданные точки задержек
  const delays = [0.4, 0.6, 0.8, 1.0, 1.2]; // Это задержки между рывками

  // Случайное количество шагов от 1 до 6
  const stepsCount = Math.floor(Math.random() * 6) + 1; // случайное количество шагов от 1 до 6

  // Массив для хранения случайных шагов в процентах
  const steps = [];
  let remainingDistance = totalDistance;

  // Генерация случайных шагов, каждый из которых не менее 10%, и все шаги должны составлять 100%
  for (let i = 0; i < stepsCount - 1; i++) {
    const step = Math.random() * (remainingDistance - 10) + 10; // случайное значение от 10% до оставшегося расстояния
    steps.push(step);
    remainingDistance -= step; // уменьшение оставшегося расстояния
  }
  steps.push(remainingDistance); // последний шаг — остаток, чтобы в сумме было 100%

  let totalDuration = 0; // Общая длительность анимации

  for (let i = 0; i < steps.length; i++) {
    // Расстояние для каждой двери
    distanceLeft += steps[i];
    distanceRight += steps[i];

    // Рандомим время задержки для каждого рывка из массива задержек
    const delay = delays[i % delays.length]; // циклическое использование задержек

    // Определяем пропорции для времени на каждого шага
    const largePercentage = 0.7; // 70% времени на большую часть пути
    const smallPercentage = 0.3; // 30% времени на маленькую часть пути

    // Определяем длительность для большого и маленького шагов
    const largeStepDuration = 1.8 + Math.random() * 0.6; // Для больших шагов (70%)
    const smallStepDuration = 0.4 + Math.random() * 0.6; // Для маленьких шагов (30%)

    // Разделяем длительность анимации на две части: для больших и маленьких промежутков
    const durationLarge =
      largeStepDuration * (steps[i] / totalDistance) * largePercentage;
    const durationSmall =
      smallStepDuration * (steps[i] / totalDistance) * smallPercentage;

    const duration = durationLarge + durationSmall; // Общая длительность для текущего шага

    // Записываем ключевые кадры для каждой из дверей
    keyframesLeft.push(
      `${
        (i + 1) * (100 / steps.length)
      }% { transform: translateX(-${distanceLeft}%); animation-duration: ${duration}s; animation-delay: ${delay}s; }`
    );
    keyframesRight.push(
      `${
        (i + 1) * (100 / steps.length)
      }% { transform: translateX(${distanceRight}%); animation-duration: ${duration}s; animation-delay: ${delay}s; }`
    );

    // Обновляем общую длительность анимации
    totalDuration += duration + delay;
  }

  // Завершаем анимацию
  keyframesLeft.push(`100% { transform: translateX(-100%); }`);
  keyframesRight.push(`100% { transform: translateX(100%); }`);

  return { keyframesLeft, keyframesRight, totalDuration };
}

// Вставка @keyframes в документ
function injectKeyframes(name, rules) {
  const styleSheet =
    [...document.styleSheets].find((s) => !s.href && s.cssRules) ||
    document.head.appendChild(document.createElement("style")).sheet;

  const keyframeRule = `@keyframes ${name} { ${rules.join(" ")} }`;
  styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);
}

export default function LoadingGates({ gatesOpen }) {
  const [leftAnim, setLeftAnim] = useState("");
  const [rightAnim, setRightAnim] = useState("");

  useEffect(() => {
    if (gatesOpen) {
      const delayBeforeStart = setTimeout(() => {
        const leftName = "rustyL_" + Math.random().toString(36).slice(2, 7);
        const rightName = "rustyR_" + Math.random().toString(36).slice(2, 7);

        const {
          keyframesLeft,
          keyframesRight,
        } = generateRustyKeyframesSymmetric();

        injectKeyframes(leftName, keyframesLeft);
        injectKeyframes(rightName, keyframesRight);

        setLeftAnim(leftName);
        setRightAnim(rightName);
      }, 500); // 500 мс задержки перед началом анимации

      return () => clearTimeout(delayBeforeStart);
    }
  }, [gatesOpen]);

  return (
    <div
      className="loading-gates"
      style={{
        "--left-anim": leftAnim,
        "--right-anim": rightAnim,
      }}
    >
      <div className={`gate left-gate ${gatesOpen ? "slide-left" : ""}`}>
        <div className="gear-container">
          <div className="gear large">
            <FaCog />
          </div>
          <div className="label">LOADING</div>
        </div>
      </div>

      <div className={`gate right-gate ${gatesOpen ? "slide-right" : ""}`}>
        <div className="gear-container gear-container-right">
          <div className="gear small">
            <FaCog />
          </div>
          <div className="label">PAGE</div>
        </div>
      </div>
    </div>
  );
}
