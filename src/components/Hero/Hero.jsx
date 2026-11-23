import "./Hero.css";

const Hero = ({
  barX = 154,
  barWidth = 38,
  barTop = 0,
  barHeight = typeof window !== "undefined" ? window.innerHeight : 900,
}) => {
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
            Digital products, <br className="desktop-br" />
            interfaces and systems— <br className="desktop-br" />
            shaped from first idea <br className="desktop-br" />
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

  // Calculate inset edges for clip-path: inset(top right bottom left)
  const topInset = `${Math.max(0, barTop)}px`;
  const rightInset = `calc(100% - ${barX + barWidth}px)`;
  const bottomInset = `calc(100% - ${Math.max(0, barTop + barHeight)}px)`;
  const leftInset = `${Math.max(0, barX)}px`;

  const clipValue = `inset(${topInset} ${rightInset} ${bottomInset} ${leftInset})`;

  return (
    <section className="hero">
      {/* Base Dark Layer */}
      {renderHeroInner(false)}

      {/* Masked White Layer (Clips everything to the exact bar coordinates) */}
      <div
        className="hero-mask-overlay"
        style={{
          clipPath: clipValue,
          WebkitClipPath: clipValue,
        }}
      >
        {renderHeroInner(true)}
      </div>
    </section>
  );
};

export default Hero;
