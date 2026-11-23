import { useState } from "react";

import Hero from "./components/Hero/Hero";
import CursorBar from "./components/CursorBar/CursorBar";
import About from "./components/About/About";

import "./App.css";

function App() {
  const [bar, setBar] = useState({
    left: window.innerWidth / 2 - 19,
    width: 38,
    top: 0,
    height: window.innerHeight,
  });

  return (
    <main className="app">
      {/* Shared blue transition element */}
      <CursorBar onPositionChange={setBar} />

      {/* Hero */}
      <Hero
        barX={bar.left}
        barWidth={bar.width}
        barTop={bar.top}
        barHeight={bar.height}
      />

      {/* About */}
      <About />
    </main>
  );
}

export default App;
