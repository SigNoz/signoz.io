import { Metadata } from 'next'
import { metadata as docsMetadata } from '../../(site)/docs/introduction/page'
import siteMetadata from '@/data/siteMetadata'

export {
  /* @next-codemod-error `default` export is re-exported. Check if this component uses `params` or `searchParams`*/
  default,
} from '../../(site)/docs/introduction/page'

export const metadata: Metadata = {
  ...docsMetadata,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/docs/introduction/`,
  },
}
