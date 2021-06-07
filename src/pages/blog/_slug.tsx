import * as React from "react"
import { compose } from "redux"
import withArticles from "../../components/hoc/withArticles"
import Article from "../../models/Article"
import BlogArticlePage from "../../components/pages/BlogArticlePage"
import {redirect} from "../../utils/navigation"
import Menu from "../../menu/models/Menu"
import withBlogMenu from "../../components/hoc/menus/withBlogMenu"

interface State {}
interface Props {
  slug?: string,
  menu: Menu;
  onBlogItemPressed?: (item) => void
  selectedArticle?: Article
  getArticleBySlug: (slug: string) => Article;
  selectArticle: (article: Article) => void;
  loadMoreArticles: () => void;
}

class BlogArticleController extends React.PureComponent<Props, State> {
  public componentDidMount = () => {
    this.loadArticle()
  }

  public loadArticle = async () => {
    try {
      const article = await this.props.getArticleBySlug(this.props.slug)
      await this.props.selectArticle(article)
      if (this.props.selectedArticle.redirect) return redirect(this.props.selectedArticle.redirect)
    } catch(e) {
      redirect(`/404`)
    }
  }

  public render = () => <BlogArticlePage
    {...this.props}
  />
}

export default compose(
  withArticles,
  withBlogMenu
)(BlogArticleController);
