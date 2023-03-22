const AboutMe: React.FC<{}> = () => {
  return (
    <section className='about-me container min-vh-100'>
      <div className='row'>
        <h1>Hey, Welcome! Thank you for visiting my website.</h1>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <img
            className='my-picture'
            src={require("./myself.jpg")}
            alt='myself'
          ></img>
        </div>
        <div className='col-sm-12 col-md-12 col-lg-6'>
          <h1>About Me</h1>
          <p>
            This website is to illustrate the coding knowledge that I have
            learnt. Before you browse around, you may be curious about how I am
            getting here. I wasn't from a STEM background, as most of the Asian
            parents, my mum told me that I am not the material to study STEM
            related subjects. Instead, I was pursuaded to study bussiness,
            therefore I went for Marketing & Management for my bachelor's
            degree. The hilarious part is that I didn't go for the Marketing
            industry concerning the working hours and wage is unsustainable. I
            went to the finanical industry like most of the Hong Konger does as
            it generally consider the most stable job followed by the
            government, which myself have no interest or passion in.
            <br />
            <br />
            However, my interest in IT couldn't stop me from learning. It brings
            me a sense of achievement when I am able to bring something to life
            from starch. At first, I took a short course to explore what I can
            do with programming and it ended up too intense, which is difficult
            to follow without some basic programming knowledge (Not to mention
            that I have to rush to the venue after work which is petty tired,
            especially working overtime is common in Hong Kong). Then, I
            enrolled some Udemy courses and try to learn coding at my own pace.
            I found it a lot easier to understand, but it still missing some
            guidance.
            <br />
            <br />
            Time passed... The political situation in Hong Kong is getting
            worse. I was planning to move to Canada for good, and saw an
            advertisment of a software engineering Bootcamp at a relatively low
            price as they had just started the business. Then I decided to quit
            my banking job and go for it in Jan 2021! Same year September, I
            moved to Waterloo, ON, Canada to start my new life.
            <br />
            <br />I have left coding for quite awhile...
            <br />
            Settling in a new country, and the website that I built during the
            Bootcamp has been terminated due to the AWS trial period ended. When
            I tried to deploy it again with my new laptop, I found some of the
            tools that I have used was no longer work in the latest version.
            <br />
            <b>
              Now I am trying to pick up the skills and redeveloping a new
              website!
            </b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
