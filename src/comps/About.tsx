import logo from './../assets/Store-E_Logo_V2.png';
import AysePhoto from '../assets/Ayse.png';
import RobbiePhoto from '../assets/Robbie.png';
import VijaniPhoto from '../assets/Vijani.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {
  return (
    <>
      <img className="home__logo" src={logo} alt="Stor-E Logo" />
    <section className="about">
        <h1 className="about__title">Meet The Team</h1>
        <div className="about__divider"></div>
        <div className="about__members">
          <div className="about__member">
            <img className='about__image' width={200} height={200} src={AysePhoto} />
            <div className="about__description">
              <h1 className='about_name'>Ayse Akir</h1>
              <h2>Developer</h2>
              <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
              <div className="about__social-media">
                <LinkedInIcon />
                <GitHubIcon />
              </div>
            </div>
          </div>
          <div className="about__member">
            <img className='about__image' width={200} height={200} src={RobbiePhoto} />
            <div className="about__description">
              <h1 className='about_name'>Robbie Corcoran</h1>
              <h2>Developer</h2>
              <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
              <div className="about__social-media">
                <LinkedInIcon />
                <GitHubIcon />
              </div>
            </div>
          </div>
          <div className="about__member">
            <img className='about__image' width={200} height={200} src={VijaniPhoto} />
            <div className="about__description">
              <h1 className='about_name'>Vijani Piyawardana</h1>
              <h2>Developer</h2>
              <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
              <div className="about__social-media">
                <LinkedInIcon />
                <GitHubIcon />
              </div>
            </div>
          </div>
        </div>
    </section>
    </>
  );
};

export default About;
