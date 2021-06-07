import {ContentfulClientInterface} from "react-contentful";
import {ContentfulCollection, Entry} from "contentful"

import Article from "../models/Article"

const CONTENT_TYPE = "blogPost";
export interface ArticlesApi {
  getArticles: (page?: number, limit?: number)
    => ContentfulCollection<Article[]>
  getArticleBySlug: (slug: string) => Entry<Article>
  searchArticles: (phrase: string) => ContentfulCollection<Article[]>
}

export default (client: ContentfulClientInterface) => ({
  getArticles: async (page = 0, limit = 4) => {
    const skip = page * limit;
    return client.getEntries({
      content_type: CONTENT_TYPE,
      order:'-fields.createdAt',
      skip,
      limit
    })
  },

  searchArticles: async (phrase?: string) => {
    let entries = []

    const values = await Promise.all([
      await client.getEntries({
        content_type: CONTENT_TYPE,
        "fields.title[match]": phrase,
        order:'-fields.createdAt',
      }),
      await client.getEntries({
        content_type: CONTENT_TYPE,
        "fields.description[match]": phrase,
        order: '-fields.createdAt',
      }),
      await client.getEntries({
        content_type: CONTENT_TYPE,
        "fields.shortDescription[match]": phrase,
        order:'-fields.createdAt',
      })
    ])

    values.map(value => {
      entries.push(...value.items)
    })

    entries = entries.map(e => JSON.stringify(e))
    entries = [...new Set(entries)];
    entries = entries.map(e => JSON.parse(e))

    values[0].items = entries;
    return values[0];
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