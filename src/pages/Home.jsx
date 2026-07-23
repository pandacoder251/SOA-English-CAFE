import "../styles/Home.css";
import panel1 from "../assets/panel1.png";
import panel2 from "../assets/panel2.png";
import panel3 from "../assets/panel3.png";
import { useEffect, useState } from "react";

function Home() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    // Backend-ready
    fetch("https://your-backend-api.com/heroes")
      .then(res => res.json())
      .then(data => setHeroes(data))
      .catch(() => {
        setHeroes(
          Array.from({ length: 7 }).map(() => ({
            name: "Leader Name",
            designation: "Designation",
            batch: "2022–26",
            image: "https://via.placeholder.com/400",
          }))
        );
      });
  }, []);

  return (
    <main className="home">

      {/* PANEL 1 — WHO WE ARE */}
      <section className="panel">
        <div className="glass-panel">
          <img src={panel1} alt="" className="glass-bg-img" />

          <div className="glass-content left">
            <h1>
              SOA <span>EnglishCafé</span>
            </h1>

            <p>
              A student-driven community focused on communication,
              confidence, and leadership.
            </p>

            <div className="panel-actions">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                Join the Club
              </a>

              <a href="/events" className="btn outline">
                Explore Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL 2 — OUR DOMAINS */}
      <section className="panel">
        <div className="glass-panel">
          <img src={panel2} alt="" className="glass-bg-img" />

          <div className="glass-content right">
            <h2>Our Domains</h2>

            <div className="domains">
              <div>
                <h3>Public Speaking & Oratory</h3>
                <p>Debates, speeches, and confidence platforms.</p>
              </div>

              <div>
                <h3>Literary & Creative Expression</h3>
                <p>Writing, poetry, and storytelling.</p>
              </div>

              <div>
                <h3>Leadership & Personality Development</h3>
                <p>Workshops and growth beyond academics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL 3 — HEROES */}
      <section className="panel">
        <div className="glass-panel">
          <img src={panel3} alt="" className="glass-bg-img" />

          <div className="glass-content center">
            <h2>Our Heroes</h2>

            <div className="heroes-grid">
              {heroes[0] && (
                <div className="hero-card highlight">
                  <div className="hero-img">
                    <img src={heroes[0].image} alt={heroes[0].name} />
                  </div>
                  <h4>{heroes[0].name}</h4>
                  <p>{heroes[0].designation}</p>
                  <span>{heroes[0].batch}</span>
                </div>
              )}

              <div className="hero-row">
                {heroes.slice(1, 4).map((hero, i) => (
                  <div key={i} className="hero-card">
                    <div className="hero-img">
                      <img src={hero.image} alt={hero.name} />
                    </div>
                    <h4>{hero.name}</h4>
                    <p>{hero.designation}</p>
                    <span>{hero.batch}</span>
                  </div>
                ))}
              </div>

              <div className="hero-row">
                {heroes.slice(4, 7).map((hero, i) => (
                  <div key={i} className="hero-card">
                    <div className="hero-img">
                      <img src={hero.image} alt={hero.name} />
                    </div>
                    <h4>{hero.name}</h4>
                    <p>{hero.designation}</p>
                    <span>{hero.batch}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PANEL 4 — SUBMIT WRITING */}
      <section className="panel">
        <div className="glass-panel no-bg">
          <div className="glass-content center">
            <h2>Submit Your Writing</h2>
            <p>Poetry, essays, stories — let your voice be heard.</p>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn primary"
            >
              Submit Now
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;