import logo from './../assets/Store-E_Logo_V2.png';
import Accordion from 'react-bootstrap/Accordion';
import AysePhoto from '../assets/Ayse.png';
import RobbiePhoto from '../assets/Robbie.png';
import VijaniPhoto from '../assets/Vijani.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Butterfly from './Butterfly';

const About = () => {
  return (
    <>
      <Butterfly />
      <img className="home__logo" src={logo} alt="Stor-E Logo" />
      <section className="about">
       <section>
          <section>
            <h1 className="about__title">Our Stor-E</h1>
            <div className="about__divider"></div>
            <p>
            Welcome to Star-E. An  Ai powered children’s story book generation app, where we integrate OpenAI's ChatGPT & Dall-E to generate unique stories full of wonder and adventure. <br />
            You can put yourself right in the middle of the fantasy and be the hero of your own imagination.  
            </p>
          </section>

          <section>
            <h1 className="about__title">What's Next</h1>
            <div className="about__divider"></div>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas alias rerum cum hic possimus amet impedit iure voluptatum repellat labore.</p>
            
          </section>

        </section> 
        <section >
          <h1 className="about__title">Meet The Team</h1>
          <div className="about__divider"></div>
          <div className="about__members">
            <div className="about__member">
              <img className="about__image" width={200} height={200} src={AysePhoto} />
              <div className="about__description">
                <h1 className="about_name">Ayse Aker Tütüncü</h1>
                <h2>Developer</h2>
                <p>
                  Ayse graduated from software engineering and carried out her professional carrier as a business analyst and technical product manager. She worked with banks and fintech companies, improving her skills in understanding client's needs, creating a scope of work in agreement with the
                  clients. After moving to Amsterdam, she decided to go back to her software engineering roots and pursue her career as a Full Stack Java developer.
                </p>
                <div className="about__social-media">
                  <LinkedInIcon />
                  <GitHubIcon />
                </div>
              </div>
            </div>
            <div className="about__member">
              <img className="about__image" width={200} height={200} src={RobbiePhoto} />
              <div className="about__description">
                <h1 className="about_name">Robbie Corcoran</h1>
                <h2>Developer</h2>
                <p>
                  With a professional background centred around Sales, Marketing & Communications for 10 years, in 2022 Robbie decided to follow his passion for coding. He started learning the basics of Front-End Development, honing his design and interactivity skills while improving his logical
                  thinking and problem solving. Since 2023, he moved his focus to Back-End Development, focusing on server-side activity, RESTful API's, and the business logic of software. Outside of coding and tech, you'll find me playing football, rock-climbing, surfing, DJing & playing music, or
                  generally being outdoors!
                </p>
                <div className="about__social-media">
                  <LinkedInIcon />
                  <GitHubIcon />
                </div>
              </div>
            </div>
            <div className="about__member">
              <img className="about__image" width={200} height={200} src={VijaniPhoto} />
              <div className="about__description">
                <h1 className="about_name">Vijani Piyawardana</h1>
                <h2>Developer</h2>
                <p>
                  Vijani is a highly skilled Full Stack Java Developer originally from Sri Lanka. With a First-class degree in BSc (Hons) Computer Science from University College Dublin, Ireland, and over 5 years of experience in academia and the software industry, she possess a strong passion for
                  coding and problem-solving. In her free time, she enjoys traveling, reading books, and listening to music.
                </p>
                <div className="about__social-media">
                  <LinkedInIcon />
                  <GitHubIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default About;
