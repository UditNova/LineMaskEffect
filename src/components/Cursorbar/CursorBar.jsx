import { useEffect, useRef, useState } from "react";
import "./CursorBar.css";

const BAR_WIDTH = 38;
const MOBILE_BAR_HEIGHT = 38;
const DESKTOP_BREAKPOINT = 1024;

const CursorBar = ({ onPositionChange }) => {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(
    () => window.innerHeight
  );
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth > DESKTOP_BREAKPOINT
  );

  // Desktop state
  const [mouseX, setMouseX] = useState(() => window.innerWidth / 2);
  const [desktopScrollProgress, setDesktopScrollProgress] = useState(0);

  // Mobile/Tablet state
  const [scrollY, setScrollY] = useState(0);
  const [glideProgress, setGlideProgress] = useState(0);
  const [isAboutFilled, setIsAboutFilled] = useState(false);

  const targetX = useRef(window.innerWidth / 2);
  const currentX = useRef(window.innerWidth / 2);
  const animationFrame = useRef(null);

  /* =========================
     VIEWPORT & BREAKPOINT
  ========================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_BREAKPOINT + 1}px)`
    );

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setIsDesktop(mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================
     DESKTOP MOUSE & LERP
  ========================= */

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (event) => {
      targetX.current = event.clientX;
    };

    window.addEventListener("pointermove", handleMouseMove);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.12;
      setMouseX(currentX.current);
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isDesktop]);

  /* =========================
     SCROLL (DESKTOP & MOBILE/TABLET)
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const vh = window.innerHeight;
      setScrollY(currentScrollY);

      // Desktop progress (unchanged)
      const dProgress = Math.min(Math.max(currentScrollY / vh, 0), 1);
      setDesktopScrollProgress(dProgress);

      if (isDesktop) return;

      const aboutEl = document.querySelector(".about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        const visibleHeight = Math.max(0, vh - rect.top);
        const twentyPercentAbout = rect.height * 0.2;

        // Glide progress: 0 at top of page -> 1 when 20% of About is visible
        const totalTravel = Math.max(
          currentScrollY + (rect.top - (vh - twentyPercentAbout)),
          1
        );
        const progress = Math.min(Math.max(currentScrollY / totalTravel, 0), 1);
        setGlideProgress(progress);

        // Expand to full screen once 20% of About section is visible
        setIsAboutFilled(visibleHeight >= twentyPercentAbout);
      } else {
        setGlideProgress(dProgress);
        setIsAboutFilled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

  /* =========================
     CALCULATE BAR GEOMETRY
  ========================= */

  let left = 0;
  let width = viewportWidth;
  let top = 0;
  let height = viewportHeight;
  let heroClipTop = 0;
  let heroClipHeight = viewportHeight;

  if (isDesktop) {
    const startX = mouseX - BAR_WIDTH / 2;
    left = startX * (1 - desktopScrollProgress);
    width = BAR_WIDTH + (viewportWidth - BAR_WIDTH) * desktopScrollProgress;
    top = 0;
    height = viewportHeight;
    heroClipTop = 0;
    heroClipHeight = viewportHeight;
  } else {
    const headerHeight = viewportWidth <= 768 ? 56 : 60;
    const startTop = headerHeight;
    const endTop = Math.max(viewportHeight - MOBILE_BAR_HEIGHT, headerHeight);
    const glidedTop = startTop + (endTop - startTop) * glideProgress;

    left = 0;
    width = viewportWidth;
    top = isAboutFilled ? 0 : glidedTop;
    height = isAboutFilled ? viewportHeight : MOBILE_BAR_HEIGHT;

    heroClipTop = (isAboutFilled ? 0 : glidedTop) + scrollY;
    heroClipHeight = height;
  }

  useEffect(() => {
    if (!onPositionChange) return;
    onPositionChange({
      left,
      width,
      top: heroClipTop,
      height: heroClipHeight,
      isMobile: !isDesktop,
      isAboutFilled: !isDesktop && isAboutFilled,
    });
  }, [
    left,
    width,
    heroClipTop,
    heroClipHeight,
    isDesktop,
    isAboutFilled,
    onPositionChange,
  ]);

  return (
    <div
      className={`cursor-bar ${!isDesktop ? "cursor-bar--mobile" : ""} ${
        !isDesktop && isAboutFilled ? "cursor-bar--filled" : ""
      }`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${top}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default CursorBar;
