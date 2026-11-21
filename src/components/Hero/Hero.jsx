import "./Hero.css";

const Hero = ({ barX = 154, barWidth = 38 }) => {
  const renderHeroInner = (isWhiteLayer = false) => (
    <div
      className={`hero-layer ${
        isWhiteLayer ? "hero-layer--white" : "hero-layer--base"
      }`}
    >
      {/* HEADER */}
      <header className="hero-header">
        <div className="hero-logo">Specialne</div>

        <div className="hero-menu">
          <span>Menu</span>
          <span className="hero-menu-icon">••</span>
        </div>
      </header>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span>01</span>
          <span>/</span>
          <span>SIGNAL</span>
        </div>

        <div className="hero-heading-wrapper">
          <h1 className="hero-heading">
            Digital products,
            <br />
            interfaces and systems—
            <br />
            shaped from first idea
            <br />
            to working form.
          </h1>
        </div>

        <p className="hero-description">
          An independent digital practice shaping product thinking,
          <br />
          visual direction and technical execution into working systems.
        </p>

        <div className="hero-meta">
          <span className="hero-meta-dot" />
          <span>BASED IN UKRAINE</span>
          <span>18:18 LV</span>
        </div>
      </div>

      {/* CONTACT */}
      <div className="hero-contact">
        <span>[</span>
        <strong>Let’s</strong>
        <strong>talk</strong>
        <span>]</span>
      </div>
    </div>
  );

  // Calculate right edge for clip-path: inset(top right bottom left)
  const rightInset = `calc(100% - ${barX + barWidth}px)`;

  return (
    <section className="hero">
      {/* Base Dark Layer */}
      {renderHeroInner(false)}

      {/* Masked White Layer (Clips everything to the exact bar coordinates) */}
      <div
        className="hero-mask-overlay"
        style={{
          clipPath: `inset(0px ${rightInset} 0px ${barX}px)`,
          WebkitClipPath: `inset(0px ${rightInset} 0px ${barX}px)`,
        }}
      >
        {renderHeroInner(true)}
      </div>
    </section>
  );
};

export default Hero;
