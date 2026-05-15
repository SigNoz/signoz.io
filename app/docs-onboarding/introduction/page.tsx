import { Metadata } from 'next'
import { metadata as docsMetadata } from '../../(site)/docs/introduction/page'
import siteMetadata from '@/data/siteMetadata'

export {
  /* @next-codemod-ignore -- verified: source `DocsIntroductionPage` takes no params */
  default,
} from '../../(site)/docs/introduction/page'

export const metadata: Metadata = {
  ...docsMetadata,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/docs/introduction/`,
  },
}
