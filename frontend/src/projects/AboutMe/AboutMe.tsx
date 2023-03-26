const AboutMe: React.FC<{}> = () => {
  return (
    <section className='about-me min-vh-100'>
      <div className='about-me__greetings-container'>
        <h1 className='about-me__greetings'>
          Thank you for visiting my website.
        </h1>
      </div>
      <div className='container'>
        <h1 className='about-me__title'>About Me</h1>
        <img
          className='about-me__picture'
          src={require("./images/myself.jpg")}
          alt='myself'
        ></img>
        <div className='about-me__subject'>Courses that I have taken:</div>
        <div>
          <span>
            Advanced CSS and Sass: Flexbox, Grid, Animations and More!
          </span>
          <span>Udemy</span>
        </div>
        <div>
          <span>
            Full Stack: React and Java Spring Boot - The Developer Guide
          </span>
          <span>Udemy</span>
        </div>
        <div>
          <span>
            React - The Complete Guide (incl Hooks, React Router, Redux)
          </span>
          <span>Udemy</span>
        </div>
        <div>
          <span>BootCamp: Full-Stack Software Engingeering</span>
          <span>Venturenix Lab (Hong Kong)</span>
        </div>
        <div>
          <span>Introduction to A.I and Programming</span>
          <span>Tecky Academy (Hong Kong)</span>
        </div>
        <div className='about-me__paragraph'>
          This website is to illustrate the coding knowledge that I have learnt.
          (The code might be a bit messy as I tried to combine everything that I
          have learnt during the process.) Before you browse around, you may be
          curious about how I am getting here.
        </div>
        <div className='about-me__paragraph'>
          I wasn't from a STEM background, as most of the Asian parents, my mum
          told me that I am not the material to study STEM related subjects as
          it is Math related. Therefore I went for Marketing & Management for my
          bachelor's degree as I think it is quite interesting. However, after
          graduated I worked in finanical industry like most of the Hong Konger
          does as it generally consider the most stable job followed by the
          government, which myself have no interest or passion in.
        </div>
        <div className='about-me__paragraph'>
          However, my interest in IT couldn't stop me from learning. It brings
          me a sense of achievement when I am able to bring something to life
          from starch. At first, I took a short course to explore what I can do
          with programming and it ended up too intense, which is difficult to
          follow without some basic programming knowledge. Then, I started to
          enroll some Udemy courses and try to learn coding at my own pace.
        </div>
        <div className='about-me__paragraph'>
          Time passed... The political situation in Hong Kong is getting worse.
          I was planning to move to Canada for good, and saw an advertisment of
          a software engineering Bootcamp at a relatively low price as they had
          just started the business. Then I decided to quit my banking job and
          go for it in Jan 2021! Same year September, I moved to Waterloo, ON,
          Canada to start my new life.
        </div>
        <div className='about-me__paragraph'>
          Thanks to the Adaptavist's benefit, I got the chance to learn and
          revise the programming I have learnt from Udemy.
        </div>
        <div className='about-me__paragraph'>
          Settling in a new country, and the website that I built during the
          Bootcamp has been terminated due to the AWS trial period ended. When I
          tried to deploy it again with my new laptop, I found some of the tools
          that I have used was no longer work in the latest version.
        </div>
        <div className='about-me__paragraph'>
          Now I am trying to pick up the skills and redeveloping a new website!
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
