import * as React from "react";

import Article from "../../../../../models/Article";
import CarouselArticleComponent from "../../../../molecules/carousel/CarouselArticle"
import Carousel from '../react-grid-carousel/'

interface Props {
  articles: Article[]
  onItemPressed: (item) => {}
  onBlogEndReached: () => void
}

export default (props: Props) => {
  const {articles, onItemPressed, onBlogEndReached} = props;
  return <Carousel
    cols={4}
    rows={1}
    gap={16}
    scrollSnap={true}
    showDots={true}
    dotColorActive={"#0080e3ff"}
    onLastPage={onBlogEndReached}
    loop
  >
    {articles && articles.map((article, key) => {
      return <Carousel.Item key={key}>
        <CarouselArticleComponent
          article={article}
          onPress={() => onItemPressed(article)}
        />
      </Carousel.Item>
    })}
  </Carousel>
}