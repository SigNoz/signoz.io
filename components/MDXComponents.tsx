import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import YouTube from './VideoPlayer/VideoPlayer'
import GetStartedSigNoz from './GetStartedSigNoz/GetStartedSigNoz'
import Admonition from './Admonition/Admonition'
import SignUps from './SignUps/SignUps'
import LogsPerf from './LogsPerf/LogsPerf'
import VersionPin from './NodeVersionPin/NodeVersionPin'
import VersionPinNestJs from './NestVersionPin/NestVersionPin'
import Tabs from './Tabs'
import TabItem from './TabItem'
import DocCard from './DocCard'
import DocCardContainer from './DocCardContainer'
import NextCarousel from './Carousel/Carousel'
import Figure from './Figure/Figure'
import PricingCTA from './PricingCTA'
import PageFeedback from './PageFeedback/PageFeedback'
import CustomMetricPlayground from './CustomMetricPlayground/CustomMetricPlayground'
import VerticalTabs from './VerticalTabs/VerticalTabs'
import FAQAccordion from './FAQAccordion/FAQAccordion'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
  GetStartedSigNoz,
  Admonition,
  SignUps,
  LogsPerf,
  VersionPin,
  VersionPinNestJs,
  Tabs,
  TabItem,
  DocCard,
  DocCardContainer,
  NextCarousel,
  Figure,
  PricingCTA,
  PageFeedback,
  CustomMetricPlayground,
  VerticalTabs,
  FAQAccordion,
}
