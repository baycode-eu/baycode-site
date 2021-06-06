import * as React from "react"
import BlogArticlesPageTemplate from "../templates/BlogArticlesPageTemplate"
import BlogList from "../organisms/blog/lists/BlogList"
import ContactModal from "../organisms/modals/ContactModal"
import { Projects } from "../organisms/projects/Projects"
import BlogSearch from "../organisms/blog/BlogSearch"

export default (props) => {
  return <BlogArticlesPageTemplate
    blogSearch={
      <BlogSearch
        onSearch={props.searchArticles}
      />
    }
    blogList={
      <BlogList
        articles={props.articles}
        onItemPressed={props.onBlogItemPressed}
        endRef={props.endRef}
      />
    }
    contactModal={
      <ContactModal
        {...props}
        contact={props.contact}
        onClose={props.closeContactModal}
        visible={props.contactModalVisible}
      />
    }
    projectsModal={
      <Projects
        visible={props.projectsDrawerVisible}
        toggle={props.toggleProjectsDrawerVisible}
        projects={props.projects}
        companies={props.companies}
      />
    }
  />
}