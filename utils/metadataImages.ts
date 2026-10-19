import siteMetadata from '@/data/siteMetadata'

export function buildMetadataImages(image?: string | string[]): {
  imageList: string[]
  ogImages: { url: string }[]
} {
  const rawImages = !image
    ? [siteMetadata.socialBanner]
    : typeof image === 'string'
      ? [image]
      : image
  const imageList = rawImages.map((img) => new URL(img, siteMetadata.siteUrl).toString())
  return { imageList, ogImages: imageList.map((url) => ({ url })) }
}
