const AboutMe: React.FC<{}> = () => {
  return (
    <section className='about-me container min-vh-100'>
      <div className='row'>
        <h1 className='welcome-message'>
          Hey, Welcome! Thank you for visiting my website.
        </h1>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <h1 className='about-me__title'>About Me</h1>
          <img
            className='my-picture'
            src={require("./myself.jpg")}
            alt='myself'
          ></img>
        </div>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <p>
            <div className='paragraph'>
              This website is to illustrate the coding knowledge that I have
              learnt. (The code might be a bit messy as I tried to combine
              everything that I have learnt during the process.) Before you
              browse around, you may be curious about how I am getting here.
            </div>
            <div className='paragraph'>
              I wasn't from a STEM background, as most of the Asian parents, my
              mum told me that I am not the material to study STEM related
              subjects as it is Math related. Therefore I went for Marketing &
              Management for my bachelor's degree as I think it is quite
              interesting. However, after graduated I worked in finanical
              industry like most of the Hong Konger does as it generally
              consider the most stable job followed by the government, which
              myself have no interest or passion in.
            </div>
            <div className='paragraph'>
              However, my interest in IT couldn't stop me from learning. It
              brings me a sense of achievement when I am able to bring something
              to life from starch. At first, I took a short course to explore
              what I can do with programming and it ended up too intense, which
              is difficult to follow without some basic programming knowledge.
              Then, I started to enroll some Udemy courses and try to learn
              coding at my own pace.
            </div>
            <div className='paragraph'>
              Time passed... The political situation in Hong Kong is getting
              worse. I was planning to move to Canada for good, and saw an
              advertisment of a software engineering Bootcamp at a relatively
              low price as they had just started the business. Then I decided to
              quit my banking job and go for it in Jan 2021! Same year
              September, I moved to Waterloo, ON, Canada to start my new life.
            </div>
            <div className='paragraph'>
              Thanks to the Adaptavist's benefit, I got the chance to learn and
              revise the programming I have learnt from Udemy.
            </div>
            <div className='paragraph'>
              Settling in a new country, and the website that I built during the
              Bootcamp has been terminated due to the AWS trial period ended.
              When I tried to deploy it again with my new laptop, I found some
              of the tools that I have used was no longer work in the latest
              version.
            </div>
            <div className='paragraph'>
              Now I am trying to pick up the skills and redeveloping a new
              website!
            </div>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
