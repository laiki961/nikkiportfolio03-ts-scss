const AboutMe: React.FC<{}> = () => {
  const greetings = (
    <div className='about-me__greetings-container'>
      <h1 className='about-me__greetings'>
        Thank you for visiting my website.
      </h1>
    </div>
  );

  const courses = (
    <div>
      <ul className='about-me__courses'>
        <li>
          <span>
            Advanced CSS and Sass: Flexbox, Grid, Animations and More!
          </span>
          <span className='about-me__course-institution'>Udemy</span>
        </li>
        <li>
          <span>
            Full Stack: React and Java Spring Boot - The Developer Guide
          </span>
          <span className='about-me__course-institution'>Udemy</span>
        </li>
        <li>
          <span>
            React - The Complete Guide (incl Hooks, React Router, Redux)
          </span>
          <span className='about-me__course-institution'>Udemy</span>
        </li>
        <li>
          <span>BootCamp: Full-Stack Software Engingeering</span>
          <span className='about-me__course-institution'>
            Venturenix Lab (Hong Kong)
          </span>
        </li>
        <li>
          <span>Introduction to A.I and Programming</span>
          <span className='about-me__course-institution'>
            Tecky Academy (Hong Kong)
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <section className='about-me min-vh-100'>
      {greetings}
      <div className='container about-me__paragraphs'>
        {/* <img
          className='about-me__picture'
          src={require("./images/myself.jpg")}
          alt='myself'
        ></img> */}

        <h1 className='about-me__title'>Purpose of this website</h1>
        <div className='about-me__paragraph'>
          The purpose of this website is to showcase my coding skills and the
          knowledge I have acquired. Please note that the code might not be
          perfectly organized as I attempted to incorporate everything I learned
          during the process. If you're curious about my background, feel free
          to learn more before exploring the site.
        </div>
        <h1 className='about-me__title'>Little background of myself</h1>
        <div className='about-me__paragraph'>
          I wasn't from a STEM background, as most of the Asian parents, my mum
          told me that I am not the material to study STEM related subjects
          since it is Math related. Therefore I went for Marketing & Management
          for my bachelor's degree as I think it is quite interesting. However,
          after graduated I worked in finanical industry like most of the Hong
          Konger does as it generally consider the most stable job followed by
          the government, which myself have no interest or passion in.
        </div>
        <h1 className='about-me__title'>How am I started?</h1>
        <div className='about-me__paragraph'>
          <p>
            I always interested in Techology, when I was small I like to Google
            things when I was facing technical issue, which I can spend a few
            hours on it and it brings me a sense of accomplishment after I
            sorted out.
          </p>
          <br />
          <p>
            Although I didn't choose engineering as my bachelor's degree, I
            didn't give up to explore the IT world after graduated. I enrolled
            an intensive course during my first full-time job, but it was too
            intense which most of the time I don't have time to keep up the pace
            as I work overtime a lot back in the time. However, it evoked my
            interest to learn.
          </p>
          <br />
          <p>
            Then, I saw a course on Udemy which is worth the value, so I
            enrolled and learning the basic HTML, CSS and JavaScript very
            slowly. It definitely gives me the idea of how to put everything
            together and build a website.
          </p>
          <br />
          Time passed... The political situation in Hong Kong is getting worse.
          I was planning to move to Canada for good, and saw an advertisment of
          a software engineering Bootcamp at a relatively low price as they had
          just started the business. Then I decided to quit my banking job and
          go for it in Jan 2021! Same year September, I moved to Waterloo, ON,
          Canada to start my new life.
        </div>
        <h1 className='about-me__title'>Why I am interested in coding?</h1>
        <div className='about-me__paragraph'>
          It brings me a sense of achievement when I am able to bring something
          to life from starch. I happy that I am able to see my progress with my
          own eyes, unlike working as an operation in bank. Although it might be
          a bit challenging when debuging, every bugs that I have solved became
          part of my experiences, which I can feel the improvement by
          identifying the bug. I love how technology makes life easier, and I
          would like to be the one who able to delivery that!
        </div>
        <h1 className='about-me__title'>What now?</h1>
        <div className='about-me__paragraph'>
          <p>
            Thanks to the Adaptavist's benefit, I got the chance to learn and
            revise the programming I have learnt. I got to say I love this so
            much! It got unlimited resources, which keeps me busy every day and
            motivation to learn!
          </p>
          <p>
            Settling in a new country, and the website that I built during the
            Bootcamp has been terminated due to the AWS trial period ended. When
            I tried to deploy it again with my new laptop, I found some of the
            tools that I have used was no longer work in the latest version.
          </p>
        </div>

        <h1 className='about-me__title'>What progress have I made so far?</h1>
        <div className='about-me__paragraph'>
          I have built 3 projects so far, the library application was from one
          of the courses that I enrolled and I built the rest for practicing.
        </div>

        <h1 className='about-me__title'>Courses that I have taken:</h1>
        {courses}
      </div>
    </section>
  );
};

export default AboutMe;
