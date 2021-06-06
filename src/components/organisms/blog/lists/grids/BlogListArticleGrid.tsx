import Article from "../../../../../models/Article"
import * as React from "react"
import ListArticle from "../../../../molecules/articles/ListArticle"
import "../../../../../assets/styles/components/organisms/articles/blog-list-article-grid.scss"

interface Props {
  articles: Article[]
  onItemPressed: (item) => {}
}

export default (props: Props) => {
  const {articles, onItemPressed} = props;

  return <div className="blog-list-article-grid">
    {articles && articles.map((article, key) => {
      return <ListArticle
        key={key}
        article={article}
        onPress={() => onItemPressed(article)}
      />
    })}
  </div>
}