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
      {contactModal}
      {projectsModal}
    </div>
  </MainLayout>
}
