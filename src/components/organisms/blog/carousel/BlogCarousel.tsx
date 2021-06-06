import * as React from "react";
import BlogCarouselGrid from "./grids/BlogCarouselGrid";
import "../../../../assets/styles/templates/blog-carousel.scss"

const BlogCarousel = (props) => {
  const {articles, onBlogClicked, onItemPressed} = props;

  return <div className="blog-carousel">
    {onBlogClicked && <h2 className="blog" onClick={onBlogClicked}>
      Blog
    </h2>}
    <div className="carousel">
      <BlogCarouselGrid
        articles={articles}
        onItemPressed={onItemPressed}
      />
    </div>
  </div>
}

export default BlogCarousel;