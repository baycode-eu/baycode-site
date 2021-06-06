import Article from "../../models/Article";
import {fromContentfulModel} from "../../mappers/ArticleMapper";
import { ArticlesApi } from "../../api/articles"

const PER_PAGE = 10;

export const actionType = {
  SET_CURRENT_PAGE: "articles/SET_CURRENT_PAGE",
  SET_ARTICLES: "articles/SET_ARTICLES",
  SET_ARTICLES_LOADING: "articles/SET_LOADING",
  SELECT_ARTICLE: "articles/SELECT_ARTICLE",
};

export interface SetArticles {
  type: typeof actionType.SET_ARTICLES;
  payload: Article[];
}

export interface SelectArticle {
  type: typeof actionType.SELECT_ARTICLE;
  payload: Article;
}

export interface SetArticlesLoading {
  type: typeof actionType.SET_ARTICLES_LOADING;
  payload: boolean;
}

export type ArticleActions =
  | SetArticles
  | SetArticlesLoading
  | SelectArticle

export const setArticles = (articles?: Article[]) => ({
  type: actionType.SET_ARTICLES,
  payload: articles
});

export const setArticlesLoading = (loading: boolean) => ({
  type: actionType.SET_ARTICLES_LOADING,
  payload: loading
});

export const selectArticle = (article: Article) => ({
  type: actionType.SELECT_ARTICLE,
  payload: article
});

export const setCurrentPage = (page: number) => ({
  type: actionType.SET_CURRENT_PAGE,
  payload: page
})

export const getArticles = (pageNumber?: number) => async (
  dispatch,
  getState,
  {articlesApi}: {articlesApi: ArticlesApi}
) => {
  const response = await articlesApi.getArticles(pageNumber || 0, PER_PAGE);
  return response.items.map(item => fromContentfulModel(item))
}

export const searchArticles = (searchPhrase?: string) => async (
  dispatch,
  getState,
  {articlesApi}: {articlesApi: ArticlesApi}
) => {
  if (!searchPhrase || !searchPhrase.length) return dispatch(reloadArticles());
  await dispatch(clearArticles());
  const response = await articlesApi.searchArticles(searchPhrase)
  dispatch(setArticles(response.items.map(item => fromContentfulModel(item))));
}

export const reloadArticles = () => async (
  dispatch: any,
  getState: any,
) => {
  await clearArticles()
  await dispatch(setArticlesLoading(true))
  const currentPage = await getState().article.currentPage
  const articles = await dispatch(getArticles(currentPage))
  await dispatch(setArticles(articles))
  await dispatch(setArticlesLoading(false))
};

export const getMoreArticles = () => async (
  dispatch: any,
  getState: any
) => {
  await dispatch(setArticlesLoading(true))
  const currentPage = await getState().article.currentPage
  const previousArticlesLength = await getState().article.articles.length

  await dispatch(setCurrentPage(currentPage + 1))
  const articles = await dispatch(getArticles(currentPage))

  await dispatch(setArticles([...getState().article.articles, ...articles]))

  const nextArticlesLength = await getState().article.articles.length
  if (nextArticlesLength <= previousArticlesLength ) {
    await dispatch(setCurrentPage(currentPage))
  }
  await dispatch(setArticlesLoading(false))
}

export const clearArticles = () => async (
  dispatch: any,
) => {
  dispatch(setCurrentPage(0))
  dispatch(setArticles([]))
};

export const getArticleBySlug = (slug: string) => async (
  getState: any,
  dispatch: any,
  {articlesApi}: {articlesApi: ArticlesApi}
) => {
  const article = await articlesApi.getArticleBySlug(slug);
  return fromContentfulModel(article)
};



