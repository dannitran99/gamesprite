"use client";

import Character from "../components/Character";
import styles from "@styles/homepage.module.scss";
import { useEffect, useRef, useState } from "react";
import { TIME_CONFIG } from "@/src/constance/config";
import Cliff from "../components/Cliff";

export default function Home() {
  const [timeHold, setTimeHold] = useState<number>(0);
  const [xPos, setXPos] = useState<number>(100);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const intervalTimeCounter = useRef(0);
  const characterRef = useRef<HTMLDivElement>(null);
  const CurrentCliffRef = useRef<HTMLDivElement>(null);
  const [charState, setCharState] = useState("idle");
  const [currentCliffY, setCurrentCliffY] = useState<number>(
    window.innerHeight / 2
  );

  useEffect(() => {
    const cliff = CurrentCliffRef.current;
    const char = characterRef.current;
    if (cliff && char) {
      char.style.top = `${currentCliffY}px`;
      cliff.style.top = `${currentCliffY}px`;
    }
  }, []);

  const mouseDownHandle = () => {
    if (!isJumping) {
      let time = 0;
      setIsJumping(true);
      setCharState("jump");
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
          setCharState("idle");
          char.style.left = `${xPos + timeHold}px`;
        }, TIME_CONFIG.TIME_MULTI * timeHold * 1000);
      }
    }
  };

  const moveLeft = () => {
    const char = characterRef.current;
    if (char) {
      setXPos(xPos - 2);
      char.style.left = `${xPos - 2}px`;
    }
  };

  const moveRight = () => {
    const char = characterRef.current;
    if (char) {
      setXPos(xPos + 2);
      char.style.left = `${xPos + 2}px`;
    }
  };

  const keyDownHandle = (e: any) => {
    switch (e.key) {
      case "a":
        setCharState("left");
        moveLeft();
        break;
      case "d":
        setCharState("right");
        moveRight();
        break;
      default:
        break;
    }
  };
  const keyUpHandle = () => {
    setCharState("idle");
  };

  return (
    <div
      className={styles.wrapper}
      onMouseDown={mouseDownHandle}
      onMouseUp={mouseUpHandle}
      onKeyDown={keyDownHandle}
      onKeyUp={keyUpHandle}
      tabIndex={0}
    >
      <div className={styles.char} ref={characterRef}>
        <Cliff />
        <Character
          timeHold={timeHold}
          isJumping={isJumping}
          charState={charState}
        />
      </div>
      <div className={styles.cliff} ref={CurrentCliffRef}></div>
    </div>
  );
}
