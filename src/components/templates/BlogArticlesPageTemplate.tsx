import * as React from "react";
import "../../assets/styles/templates/blog-articles.scss"
import MainLayout from "../layouts/MainLayout";

export default (props) => {
  const {
    menu,
    blogList,
    blogSearch,
    contactModal,
    projectsModal,
    endRef
  } = props

  return <MainLayout
    menu={menu}
    noParticles
  >
    <div className="blog-articles-page-template">
      <section className="blog-search-section">
        {blogSearch}
      </section>
      <section className="blog-list-section">
        {blogList}
      </section>
      <div className="end" ref={endRef}/>
      {contactModal}
      {projectsModal}
    </div>
  </MainLayout>
}
