// import classes from "./PageContent.module.css";
import "../../App.scss";

function PageContent({ title, children }) {
  return (
    <section id='page-content'>
      <div className='page-content'>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export default PageContent;
