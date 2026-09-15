import "./Hero.css";

const Hero = ({ barX = 154, barWidth = 38 }) => {
  /*
    IMPORTANT:
    We explicitly define the line breaks.

    This guarantees that the black and white
    text layers always have exactly the same
    layout.
  */
  const heading = (
    <>
      Digital products,
      <br />
      interfaces and systems—
      <br />
      shaped from first idea
      <br />
      to working form.
    </>
  );

  /*
    Hero content starts at 20px from the
    viewport left edge.

    CursorBar gives us its position relative
    to the viewport, so we convert it into
    the Hero heading's coordinate system.
  */
  const headingOffset = 20;

  const maskLeft = barX - headingOffset;

  return (
    <section className="hero">
      {/* =========================
          HEADER
      ========================= */}

      <header className="hero-header">
        <div className="hero-logo">Specialne</div>

        <div className="hero-menu">
          <span>Menu</span>

          <span className="hero-menu-icon">••</span>
        </div>
      </header>

      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="hero-content">
        {/* Eyebrow */}

        <div className="hero-eyebrow">
          <span>01</span>

          <span>/</span>

          <span>SIGNAL</span>
        </div>

        {/* =========================
            HEADING
        ========================= */}

        <div className="hero-heading-wrapper">
          {/* BLACK TEXT */}

          <h1 className="hero-heading hero-heading-black">{heading}</h1>

          {/* WHITE TEXT MASK */}

          <div
            className="hero-heading-mask"
            style={{
              left: `${maskLeft}px`,
              width: `${barWidth}px`,
            }}
          >
            <h1
              className="hero-heading hero-heading-white"
              style={{
                left: `${-maskLeft}px`,
              }}
            >
              {heading}
            </h1>
          </div>
        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <p className="hero-description">
          An independent digital practice shaping product thinking,
          <br />
          visual direction and technical execution into working systems.
        </p>

        {/* =========================
            META
        ========================= */}

        <div className="hero-meta">
          <span className="hero-meta-dot" />

          <span>BASED IN UKRAINE</span>

          <span>18:18 LV</span>
        </div>
      </div>

      {/* =========================
          CONTACT
      ========================= */}

      <div className="hero-contact">
        <span>[</span>

        <strong>Let’s</strong>

        <strong>talk</strong>

        <span>]</span>
      </div>
    </section>
  );
};

export default Hero;
