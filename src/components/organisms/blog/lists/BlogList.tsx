import * as React from "react"
import BlogListArticleGrid from "./grids/BlogListArticleGrid"

const BlogList = (props) => {
  const {
    articles,
    onItemPressed,
  } = props;

  return <div className="blog-list">
    <BlogListArticleGrid
      articles={articles}
      onItemPressed={onItemPressed}
    />
  </div>
}

export default BlogList;