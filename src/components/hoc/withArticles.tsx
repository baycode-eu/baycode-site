import * as React from "react";
import { connect } from "react-redux"
import { compose } from "redux";
import Article from "../../models/Article"
import {NotificationManager} from 'react-notifications';
import {redirect} from "../../utils/navigation"
import {debounce} from 'simple-debouncer'

import {
  clearArticles,
  reloadArticles,
  getArticleBySlug,
  selectArticle,
  searchArticles,
  loadMoreArticlesDispatcher
} from "../../store/actions/ArticleActions"

const onBlogItemPressed = async item => {
  if (!item.slug) return NotificationManager.info("To be announced")
  redirect(`/blog/${item.slug}`)
}

const onBlogClicked = async () => {
  redirect(`/blog/`)
}

const mapDispatchToProps = dispatch => ({
  loadMoreArticles: () => dispatch(loadMoreArticlesDispatcher()),
  onBlogItemPressed: item => onBlogItemPressed(item),
  onBlogClicked: () => onBlogClicked(),
  selectArticle: (article: Article) => dispatch(selectArticle(article)),
  reloadArticles: () => dispatch(reloadArticles()),
  searchArticles: (search) => dispatch(searchArticles(search)),
  clearArticles: () => dispatch(clearArticles()),
  getArticleBySlug: (slug: string) =>
    dispatch(getArticleBySlug(slug))
})

const mapStateToProps = state => ({
  articlesLoading: state.article.articlesLoading,
  articles: state.article.articles,
  selectedArticle: state.article.selectedArticle
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WrappedComponent => (props) => <WrappedComponent {...props} />
)






