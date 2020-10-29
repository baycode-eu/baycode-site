import {actionType, ArticleActions} from "../actions/ArticleActions"
import Article from "../../models/Article";

export type ArticleState = Readonly<{
  readonly articles: Article[]
  readonly currentPage: number,
  readonly articlesLoading: boolean
  readonly selectedArticle: Article | null
}>

export const initialState: ArticleState = {
  articles: [],
  currentPage: 0,
  articlesLoading: false,
  selectedArticle: null
}

export default function articleReducer(state = initialState, action: ArticleActions) {
  switch (action.type) {
    case actionType.SET_ARTICLES: {
      return {
        ...state,
        articles: action.payload
      }
    }

    case actionType.SET_ARTICLES_LOADING: {
      return {
        ...state,
        articlesLoading: action.payload
      }
    }

    case actionType.SELECT_ARTICLE: {
      return {
        ...state,
        selectedArticle: action.payload
      }
    }

    default:
      return state;
  }
}
