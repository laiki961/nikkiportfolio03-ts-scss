function PageContent({ title, children }) {
  return (
    <section id='page-content'>
      <div className='page-content'>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}

export default PageContent;
