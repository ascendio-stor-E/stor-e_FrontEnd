import { stopNarration } from "../common/helpers/VoiceNarrator";
import logo from "./../assets/Store-E_Logo_V2.png";

const About = () => {
    stopNarration();
    return (
      <section className="about">
        <h3>Introduction to Store-E</h3>
        <h3>Development Team</h3>
        <img className="home__logo" src={logo} alt="Stor-E Logo" />
      </section>
    )
  };
  
  export default About;
