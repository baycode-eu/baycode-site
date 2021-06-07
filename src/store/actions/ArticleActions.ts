import Article from "../../models/Article";
import {fromContentfulModel} from "../../mappers/ArticleMapper";
import { ArticlesApi } from "../../api/articles"

const PER_PAGE = 6;

export const actionType = {
  SET_CURRENT_PAGE: "articles/SET_CURRENT_PAGE",
  SET_ARTICLES: "articles/SET_ARTICLES",
  SET_TOTAL: "articles/SET_TOTAL",
  SET_ARTICLES_LOADING: "articles/SET_LOADING",
  SELECT_ARTICLE: "articles/SELECT_ARTICLE",

};

export interface SetTotal {
  type: typeof actionType.SET_TOTAL;
  payload: Article[];
}

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
  | SetTotal

export const setArticles = (articles?: Article[]) => ({
  type: actionType.SET_ARTICLES,
  payload: articles
});

export const setArticlesLoading = (loading: boolean) => ({
  type: actionType.SET_ARTICLES_LOADING,
  payload: loading
});

export const setTotal = (number: number) => ({
  type: actionType.SET_TOTAL,
  payload: number
})

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
  return {
    articles: response.items.map(item => fromContentfulModel(item)),
    total: response.total
  }
}

export const searchArticles = (searchPhrase?: string) => async (
  dispatch,
  getState,
  {articlesApi}: {articlesApi: ArticlesApi}
) => {
  if (!searchPhrase || !searchPhrase.length) return dispatch(reloadArticles());
  await dispatch(clearArticles());
  const response = await articlesApi.searchArticles(searchPhrase)
  dispatch(setTotal(response.total));
  dispatch(setArticles(response.items.map(item => fromContentfulModel(item))));
}

export const reloadArticles = () => async (
  dispatch: any,
  getState: any,
) => {
  await clearArticles()
  await dispatch(setArticlesLoading(true))
  const currentPage = await getState().article.currentPage
  const {articles, total} = await dispatch(getArticles(currentPage))

  if (articles.length) {
    await dispatch(setTotal(total))
  }

  await dispatch(setArticles(articles))
  await dispatch(setArticlesLoading(false))
};

export const loadMoreArticlesDispatcher = () => async (
  dispatch: any,
  getState: any
) => {
  const currentArticlesLength = await getState().article.articles.length
  const totalArticlesLength = await getState().article.total

  if (currentArticlesLength < totalArticlesLength) {
    await dispatch(getMoreArticles())
  }
}

export const getMoreArticles = () => async (
  dispatch: any,
  getState: any
) => {
  await dispatch(setArticlesLoading(true))

  let currentPage = await getState().article.currentPage
  await dispatch(setCurrentPage(currentPage + 1))
  currentPage = await getState().article.currentPage

  const {articles, total} = await dispatch(getArticles(currentPage))

  await dispatch(setArticles([...getState().article.articles, ...articles]))
  await dispatch(setTotal(total))

  await dispatch(setArticlesLoading(false))
}

export const clearArticles = () => async (
  dispatch: any,
) => {
  dispatch(setCurrentPage(0))
  dispatch(setArticles([]))
  dispatch(setTotal(0));
};

export const getArticleBySlug = (slug: string) => async (
  getState: any,
  dispatch: any,
  {articlesApi}: {articlesApi: ArticlesApi}
) => {
  const article = await articlesApi.getArticleBySlug(slug);
  return fromContentfulModel(article)
};



