import * as React from "react"
import BlogArticlesPageTemplate from "../templates/BlogArticlesPageTemplate"
import BlogList from "../organisms/blog/lists/BlogList"
import BlogSearch from "../organisms/blog/BlogSearch"

export default (props) => {
  return <BlogArticlesPageTemplate
    menu={props.menu}
    endRef={props.endRef}
    blogSearch={
      <BlogSearch
        onSearch={props.searchArticles}
      />
    }
    blogList={
      <BlogList
        articles={props.articles}
        onItemPressed={props.onBlogItemPressed}
      />
    }
  />
}