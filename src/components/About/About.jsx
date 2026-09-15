import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <div className="about-label">
          <span>02</span>
          <span>/</span>
          <span>ABOUT</span>
        </div>

        <div className="about-main">
          <h2 className="about-title">
            We shape ideas
            <br />
            into digital
            <br />
            experiences.
          </h2>

          <div className="about-description">
            <p>
              We are an independent digital practice working across strategy,
              design and technology.
            </p>

            <p>
              From the first idea to the final working system, we create digital
              products that are clear, useful and built to last.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <span>STRATEGY</span>
          <span>DESIGN</span>
          <span>DEVELOPMENT</span>
        </div>
      </div>
    </section>
  );
};

export default About;
