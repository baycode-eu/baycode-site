import * as React from "react"
import { compose } from "redux"
import withArticles from "../../components/hoc/withArticles"
import withContact from "../../components/hoc/withContact"
import withBlogMenu from "../../components/hoc/menus/withBlogMenu"
import Article from "../../models/Article"
import BlogArticlePage from "../../components/pages/BlogArticlePage"
import {redirect} from "../../utils/navigation"
import withExperience from "../../components/hoc/withExperience"
import Contact from "../../models/Contact"
import withEstimate from "../../components/hoc/withEstimate";

interface State {}
interface Props {
  slug?: string,
  onBlogItemPressed?: (item) => void
  selectedArticle?: Article
  getArticleBySlug: (slug: string) => Article;
  selectArticle: (article: Article) => void;
  contact: Contact,
  contactModalVisible: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  toggleProjectsDrawerVisible: () => void;
  projectsDrawerVisible: boolean;
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
  withExperience,
  withEstimate,
  withContact,
  withBlogMenu
)(BlogArticleController);
