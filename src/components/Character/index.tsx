import styles from "@styles/character.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CHAR_SIZE } from "@/src/constance/config";
import { TIME_CONFIG } from "@/src/constance/config";
interface IProps {
  timeHold: number;
  isJumping: boolean;
  charState: string;
}

const Character = ({ timeHold, isJumping, charState }: IProps) => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const characterBoxRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const intervalChangeImg = useRef(0);

  useEffect(() => {
    const char = characterRef.current;
    window.clearInterval(intervalChangeImg.current);
    if (char) {
      switch (charState) {
        case "idle":
          var img = 0;
          intervalChangeImg.current = window.setInterval(() => {
            if (img > 3) img = 0;
            char.style.backgroundPosition = `${-CHAR_SIZE.SIZE * img}px 0px`;
            img++;
          }, 300);
          return;
        case "jump":
          var img = 0;
          intervalChangeImg.current = window.setInterval(() => {
            if (img > 5) img = 0;
            char.style.backgroundPosition = `${-CHAR_SIZE.SIZE * img}px 0px`;
            img++;
          }, 300);
          return;
        case "left":
          var img = 5;
          intervalChangeImg.current = window.setInterval(() => {
            if (img < 0) img = 5;
            char.style.backgroundPosition = `${-CHAR_SIZE.SIZE * img}px 0px`;
            img--;
          }, 300);
          return;
        case "right":
          var img = 0;
          intervalChangeImg.current = window.setInterval(() => {
            if (img > 5) img = 0;
            char.style.backgroundPosition = `${-CHAR_SIZE.SIZE * img}px 0px`;
            img++;
          }, 300);
          return;
        default:
          break;
      }
    }
  }, [charState]);

  useEffect(() => {
    const ruler = rulerRef.current;
    const characterBox = characterBoxRef.current;
    const char = characterRef.current;
    if (characterBox && ruler && char) {
      characterBox.style.width = `${timeHold}px`;
      characterBox.style.height = `${timeHold}px`;
      characterBox.style.transition = `transform ${
        TIME_CONFIG.TIME_MULTI * timeHold
      }s linear`;
      char.style.transition = `transform ${
        TIME_CONFIG.TIME_MULTI * timeHold
      }s linear`;
      ruler.style.width = `${timeHold}px`;
      ruler.style.height = `${timeHold / 2}px`;
      ruler.style.borderRadius = `${timeHold}px ${timeHold}px 0 0 `;
    }
    if (!isJumping && timeHold && characterBox && char) {
      characterBox.style.transform = "rotate(180deg)";
      char.style.transform = "translate(-50%, -50%) rotate(-180deg)";
      const timer = setTimeout(() => {
        characterBox.style.transform = "rotate(0deg)";
        char.style.transform = "translate(-50%, -50%) rotate(0deg)";
        characterBox.style.transition = `transform 0s linear`;
        char.style.transition = `transform 0s linear`;
      }, TIME_CONFIG.TIME_MULTI * timeHold * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isJumping, timeHold]);

  return (
    <div className={styles.charWrapper} ref={characterBoxRef}>
      <div
        className={clsx({
          [styles.idle]: charState === "idle",
          [styles.jump]: charState === "jump",
          [styles.left]: charState === "left",
          [styles.right]: charState === "right",
          [styles.character]: true,
        })}
        ref={characterRef}
      >
        {isJumping && <div className={styles.ruler} ref={rulerRef}></div>}
      </div>
    </div>
  );
};

export default Character;
