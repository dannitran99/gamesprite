"use client";

import Character from "../components/Character";
import styles from "@styles/homepage.module.scss";
import { useRef, useState } from "react";
import { TIME_CONFIG } from "@/src/constance/config";

export default function Home() {
  const [timeHold, setTimeHold] = useState<number>(0);
  const [xPos, setXPos] = useState<number>(100);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const intervalTimeCounter = useRef(0);
  const characterRef = useRef<HTMLDivElement>(null);
  const mouseDownHandle = () => {
    if (!isJumping) {
      let time = 0;
      setIsJumping(true);
      intervalTimeCounter.current = window.setInterval(() => {
        setTimeHold(time++);
      }, 1);
    }
  };

  const mouseUpHandle = () => {
    if (isJumping) {
      setIsJumping(false);
      window.clearInterval(intervalTimeCounter.current);
      setXPos(xPos + timeHold);
      const char = characterRef.current;
      if (char) {
        setTimeout(() => {
          char.style.left = `${xPos + timeHold}px`;
        }, TIME_CONFIG.TIME_MULTI * timeHold * 1000);
      }
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseDown={mouseDownHandle}
      onMouseUp={mouseUpHandle}
    >
      <div className={styles.char} ref={characterRef}>
        <Character timeHold={timeHold} isJumping={isJumping} />
      </div>
    </div>
  );
}
