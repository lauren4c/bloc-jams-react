import React from "react";
import './landing.css';


const Landing = () => (
  <section className="landing">
    <section className="main-content">
      <h1 className="hr-title">Turn the music up!</h1>
      <section className="selling-points">
        <section className="point">  <h2>Choose your music</h2>
          <p>
            The world is full of music; why should you have to listen to music
            that someone else chose?
          </p>
        </section>
        <section className="point">
          <h2>Unlimited, streaming, ad-free</h2>
          <p>
            No arbitrary limits. No distractions.
          </p>
          </section>
          <section className="point">
          <h2 >Mobile enabled</h2>
          <p>
            Listen to your music on the go. This streaming service is available
            on all mobile platforms.
          </p>
          </section>
      </section>
    </section>
  </section>
);

export default Landing;
