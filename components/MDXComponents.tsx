import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import YouTube from './VideoPlayer/VideoPlayer'
import GetStartedSigNoz from '../docs/shared/get-started-signoz'
import SignUps from '../docs/shared/sign-ups'
import LogsPerf from '../docs/shared/logs-perf-cta'
import VersionPin from '../docs/shared/nodejs-version-pin'
import VersionPinNestJs from '../docs/shared/nestjs-version-pin'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
  GetStartedSigNoz,
  SignUps,
  LogsPerf,
  VersionPin,
  VersionPinNestJs
}
