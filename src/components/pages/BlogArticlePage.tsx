import * as React from "react"

import BlogArticlePageTemplate from "../templates/BlogArticlePageTemplate"
import BlogCarousel from "../organisms/blog/carousel/BlogCarousel"
import ArticleInfo from "../organisms/blog/ArticleInfo"
import ArticleContents from "../organisms/blog/ArticleContents"

export default (props) => {
  return <BlogArticlePageTemplate
    title={props.selectedArticle?.title}
    description={props.selectedArticle?.shortDescription || props.selectedArticle?.description}
    image={props.selectedArticle?.header}
    contents={props.selectedArticle?.contents}
    articleInfo={<ArticleInfo
      title={props.selectedArticle?.title}
      description={props.selectedArticle?.description}
      author={props.selectedArticle?.author}
    />}
    articleContents={<ArticleContents
      redirect={props.selectedArticle?.redirect}
      contents={props.selectedArticle?.contents}
    />}
    blogCarousel={props.articles && <BlogCarousel
      articles={props.articles}
      onItemPressed={props.onBlogItemPressed}
      onBlogClicked={props.onBlogClicked}
    />}
    {...props}
  />
}