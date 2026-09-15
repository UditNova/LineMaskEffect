import { useEffect, useRef, useState } from "react";
import "./CursorBar.css";

const BAR_WIDTH = 38;

const CursorBar = ({ onPositionChange }) => {
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetX = useRef(window.innerWidth / 2);
  const currentX = useRef(window.innerWidth / 2);
  const animationFrame = useRef(null);

  /* =========================
     MOUSE
  ========================= */

  useEffect(() => {
    const handleMouseMove = (event) => {
      targetX.current = event.clientX;
    };

    window.addEventListener("pointermove", handleMouseMove);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  /* =========================
     SMOOTH CURSOR MOVEMENT
  ========================= */

  useEffect(() => {
    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.12;

      setMouseX(currentX.current);

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  /* =========================
     SCROLL
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     CALCULATE BAR
  ========================= */

  /*
    At scrollProgress = 0:

        mouse position
             ↓
        ───── ███ ─────


    At scrollProgress = 1:

        ███████████████████████
    */

  const startX = mouseX - BAR_WIDTH / 2;

  const left = startX * (1 - scrollProgress);

  const width = BAR_WIDTH + (window.innerWidth - BAR_WIDTH) * scrollProgress;

  /* =========================
     SEND POSITION TO HERO
  ========================= */

  useEffect(() => {
    if (!onPositionChange) return;

    onPositionChange({
      left,
      width,
    });
  }, [left, width, onPositionChange]);

  return (
    <div
      className="cursor-bar"
      style={{
        left: `${left}px`,
        width: `${width}px`,
      }}
    />
  );
};

export default CursorBar;
