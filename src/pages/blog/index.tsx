import * as React from "react"
import BlogArticlesPage from "../../components/pages/BlogArticlesPage"
import withArticles from "../../components/hoc/withArticles"
import { compose } from "redux"
import Article from "../../models/Article"
import { MutableRefObject } from "react"
import {debounce} from 'simple-debouncer'

interface Props {
  articles: Article[];
  onBlogItemPressed?: (item) => void
  searchArticles?: (search) => void
  loadMoreArticles: () => void
}
interface State {
  endRef: MutableRefObject<HTMLDivElement>;
}

class BlogArticlesController extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      endRef: React.createRef<HTMLDivElement>()
    }
  }

  onEndRefReached = () => {
    if (!this.state.endRef.current) return

    const rect = this.state.endRef.current.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const isVisible = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);

    if (isVisible) this.props.loadMoreArticles()
  }

  render = () => {
    return <BlogArticlesPage
      {...this.state}
      {...this.props}
    />
  }

  componentDidMount() {
    window.addEventListener(
      'scroll',
      () => debounce(() => this.onEndRefReached(), 500)
    );
  }
}

export default compose(
  withArticles,
)(BlogArticlesController);
