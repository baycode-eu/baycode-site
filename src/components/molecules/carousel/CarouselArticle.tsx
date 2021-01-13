import * as React from "react"
import Article from "../../../models/Article";
import "../../../assets/styles/components/common/carousel-article.scss";

interface Props {
  article: Article
  onPress: (any) => {}
}

export default ({article, onPress}: Props) => {
  return <div
    className={`carousel-article ${!article.slug && 'locked'}`}
    onClick={onPress}
  >
    <div className="image">
      {article.thumbnail && <img
        src={article.thumbnail}
         alt={article.description}
      />}
    </div>
    <div className="describe">
      <div className="title">
        <h4>{article.title}</h4>
      </div>
      <div className="description">
        <p>{article.shortDescription || article.description}</p>
      </div>
    </div>

  </div>
}