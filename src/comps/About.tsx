import logo from './../assets/Store-E_Logo_V2.png';
import AysePhoto from '../assets/Ayse.png';
import RobbiePhoto from '../assets/Robbie.png';
import VijaniPhoto from '../assets/Vijani.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Loading from './Loading';

const About = () => {
  return (
    <>
      <img className="home__logo" src={logo} alt="Stor-E Logo" />
      <section className="about">
        <section>
          <h1 className="about__title">Our Stor-E</h1>
          <div className="about__divider"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem ex repellendus iste, nostrum quaerat ducimus id hic deleniti dolorum impedit non tempora, nemo aliquid odit ipsum aut quae molestias ipsam alias modi maxime illum asperiores totam! Totam sed cum, non, tenetur
            necessitatibus perspiciatis beatae quas ad distinctio veniam sit. Repudiandae officiis minus accusamus corporis magnam repellat optio amet dolor soluta nisi sunt maiores officia odit, sit numquam consequuntur, quam repellendus nostrum, aspernatur laudantium tempora voluptate quidem.
            Eaque sequi maiores, nesciunt ipsam quisquam optio aspernatur quam, voluptatibus repellendus voluptates quo ratione voluptatum. A facilis natus fuga facere qui illum perspiciatis dolore.
          </p>
        </section>
        <section>
          <h1 className="about__title">Meet The Team</h1>
          <div className="about__divider"></div>
          <div className="about__members">
            <div className="about__member">
              <img className="about__image" width={200} height={200} src={AysePhoto} />
              <div className="about__description">
                <h1 className="about_name">Ayse Akir</h1>
                <h2>Developer</h2>
                <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
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
                <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
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
                <p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectet.</p>
                <div className="about__social-media">
                  <LinkedInIcon />
                  <GitHubIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1 className="about__title">What's Next</h1>
          <div className="about__divider"></div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas alias rerum cum hic possimus amet impedit iure voluptatum repellat labore.
         </p>
        </section>
      </section>
    </>
  );
};

export default About;
