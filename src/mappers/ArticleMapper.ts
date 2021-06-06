import Article from "../models/Article";

export const fromContentfulModel = (item): Article => {
  const thumbnail = item.fields.thumbnail?.fields.file.url
  const header = item.fields.header?.fields.file.url
  const date = item.fields.createdAt && new Date(item.fields.createdAt);

  return {
    author: item.fields.author ? {
      firstname: item.fields.author?.fields.firstname,
      lastname: item.fields.author?.fields.lastname,
      description: item.fields.author?.fields.description,
      avatar: `https:${item.fields.author?.fields?.avatar?.fields?.file?.url}`
    }: null,
    slug: item.fields.slug,
    title: item.fields.title,
    description: item.fields.description,
    shortDescription: item.fields.shortDescription,
    thumbnail: thumbnail && `https:${thumbnail}`,
    header: header && `https:${header}`,
    contents: item.fields.contents,
    createdAt: item.fields.createdAt && `${date.getDay() + 1}.${date.getMonth()}.${date.getFullYear()}`,
    redirect: item.fields.redirect
  }
}