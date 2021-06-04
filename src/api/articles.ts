import {ContentfulClientInterface} from "react-contentful";
import {ContentfulCollection, Entry} from "contentful"

import Article from "../models/Article"

const CONTENT_TYPE = "blogPost";
export interface ArticlesApi {
  getArticles: (page?: number, limit?: number)
    => ContentfulCollection<Article[]>
  getArticleBySlug: (slug: string) => Entry<Article>
}

export default (client: ContentfulClientInterface) => ({
  getArticles: async (page = 0, limit = 10) => {
    const skip = page * limit;
    return client.getEntries({
      content_type: CONTENT_TYPE,
      order:'-fields.createdAt',
      skip,
      limit
    })
  },

  getArticleBySlug: async (slug: string) => {
    const response = await client.getEntries({
      content_type: CONTENT_TYPE,
      "fields.slug[in]": slug,
      "include": 2
    })

    return getSingleEntry(response);
  }
})

export const getSingleEntry = (response) => {
  if (response.items.length) {
    return response.items[0]
  } else {
    throw new Error("Not found")
  }
}