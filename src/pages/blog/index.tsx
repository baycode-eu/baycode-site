import * as React from "react"
import BlogArticlesPage from "../../components/pages/BlogArticlesPage"
import withArticles from "../../components/hoc/withArticles"
import { compose } from "redux"
import Article from "../../models/Article"

interface Props {
  articles: Article[];
  onBlogItemPressed?: (item) => void
  searchArticles?: (search) => void
}
interface State {}

class BlogArticlesController extends React.PureComponent<Props, State> {
  render = () => {
    return <BlogArticlesPage
      {...this.props}
    />
  }
}

export default compose(
  withArticles,
)(BlogArticlesController);
