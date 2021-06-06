import Article from "../../../models/Article"
import "../../../assets/styles/components/molecules/list-article.scss"
import * as React from "react"

interface Props {
  article: Article
  onPress: (any) => {}
}

export default ({article, onPress}: Props) => {
  return <div
    className={`list-article ${!article.slug && 'locked'}`}
    onClick={onPress}
  >
    <div className="image">
      {article.thumbnail && <img src={article.thumbnail} alt={article.description} />}
    </div>
    <div className="article-body">
      <div className="title-description">
        <div className="title">
          <h4>{article.title}</h4>
        </div>
        <div className="description">
          <p>{article.shortDescription || article.description}</p>
        </div>
      </div>
      <div className="rest">
        <div className="list-author">
          <p>{`Author: ${article.author?.firstname} ${article.author?.lastname}`} </p>
        </div>
        <div className="createdAt">
          <p>{`Date: ${article.createdAt}`}</p>
        </div>
      </div>
    </div>
  </div>
}