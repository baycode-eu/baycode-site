import * as React from "react";
import BlogCarouselGrid from "./grids/BlogCarouselGrid";
import "../../../../assets/styles/templates/blog-carousel.scss"

const BlogCarousel = (props) => {
  const {articles, onBlogClicked, onItemPressed, onBlogEndReached} = props;

  return <div className="blog-carousel">
    {onBlogClicked && <h2 className="blog" onClick={onBlogClicked}>
      Blog
    </h2>}
    <div className="carousel">
      <BlogCarouselGrid
        articles={articles}
        onItemPressed={onItemPressed}
        onBlogEndReached={onBlogEndReached}
      />
    </div>
  </div>
}

export default BlogCarousel;