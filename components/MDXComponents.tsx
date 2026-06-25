import TOCInline from 'pliny/ui/TOCInline'
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
import NextImage from 'next/image'
import PricingCTA from './PricingCTA'
import PageFeedback from './PageFeedback/PageFeedback'
import CustomMetricPlayground from './CustomMetricPlayground/CustomMetricPlayground'
import VerticalTabs from './VerticalTabs/VerticalTabs'
import FAQAccordion from './FAQAccordion/FAQAccordion'
import Button from './Button/Button'
import DatadogPricingCalculator from './DatadogPricingCalculator/DatadogPricingCalculator'
import DatadogVsSigNoz from './DatadogVsSigNoz/DatadogVsSigNoz'
import GrafanaVsSigNoz from './GrafanaVsSigNoz/GrafanaVsSigNoz'
import NewRelicVsSigNoz from './NewRelicVsSigNoz/NewRelicVsSigNoz'
import DatadogAlternativesFinder from './DatadogAlternativesFinder/DatadogAlternativesFinder'
import GetStartedOpenTelemetryButton from './GetStartedOpenTelemetryButton/GetStartedOpenTelemetryButton'
import InterlinkCard from './InterlinkCard/InterlinkCard'
import InArticleVideoShowcaseModal from './InArticleVideoShowcaseModal/InArticleVideoShowcaseModal'
import GetStartedInfrastructureMonitoring from './GetStartedInfrastructureMonitoring/GetStartedInfrastructureMonitoring'
import ImageCTA from './ImageCTA/ImageCTA'
import TrackingLink from './TrackingLink'
import Listicle from './Listicle/Listicle'
import MDXButton from './MDXButton/MDXButton'
import IconCardGrid from './Card/IconCardGrid'
import HostingDecision from './shared/HostingDecision'
import CloneRepo from './shared/CloneRepo'
import CommonPrerequisites from './shared/CommonPrerequisites'
import K8sInstall from './shared/K8sInstall'
import K8sOtelDemo from './shared/K8sOtelDemo'
import RetentionInfo from './shared/RetentionInfo'
import SigNozCloud from './shared/SigNozCloud'
import UpgradeInfo from './shared/UpgradeInfo'
import OtelOperatorOTLPEndpoint from './shared/OtelOperatorOTLPEndpoint'
import OtelOperatorAutoInstrumentation from './shared/OtelOperatorAutoInstrumentation'
import GetHelp from './shared/GetHelp'
import K8sNextSteps from './shared/K8sNextSteps'
import MultiNodePart1 from './shared/MultiNodePart1'
import MultiNodePart2 from './shared/MultiNodePart2'
import PrereqsInstrument from './shared/PrereqsInstrument'
import TraefikMetrics from './shared/TraefikMetrics'
import MetricsDefinition from './shared/MetricsDefinition'
import CHClientWithOutput from './shared/CHClientWithOutput'

import ArticleSeriesBottom from './ArticleSeries/ArticleSeriesBottom'
import ArticleSeriesTop from './ArticleSeries/ArticleSeriesTop'
import DashboardActions from './Dashboards/DashboardActions'
import ProductFeatureShowcase from './ProductFeatureShowcase/ProductFeatureShowcase'

import OtelCollectorFlow from './OtelCollectorFlow/OtelCollectorFlow'

import ResponseTimeVisualizer from './APMMetrics/ResponseTimeVisualizer'
import ToggleHeading from './Headings/ToggleHeading'
import Region from './Region/Region'
import RegionTable from './Region/RegionTable'
import { RegionAwarePre, RegionAwareCode } from './Region/RegionAwareComponents'

import CardinalityExplosion from './HighCardinalityData/CardinalityExplosion'
import MemoryGauge from './HighCardinalityData/MemoryGauge'
import QueryRace from './HighCardinalityData/QueryRace'
import SamplingAggregation from './HighCardinalityData/SamplingAggregation'
import UsersAnalogy from './HighCardinalityData/UsersAnalogy'
import Tooltip from './ui/Tooltip'
import InlineCTA from './InlineCTA/InlineCTA'
import DatabaseTable from './HighCardinalityData/DatabaseTable'
import MCPInstallButton from './MCPInstallButton/MCPInstallButton'
import IncidentCostGraphic from './Blog/IncidentCostGraphic.lazy'

// MDXComponents type from @types/mdx@2.0.13 expects React-18-shape components
// (props: any) => Element | null, while @types/react@19 widens FC return to
// ReactNode | Promise<ReactNode> to support async components. The runtime
// shape is unchanged. Casting through unknown until @types/mdx catches up.
export const components = {
  Region,
  region: Region,
  RegionTable,
  ToggleHeading,
  Image,
  TOCInline,
  a: CustomLink,
  pre: RegionAwarePre,
  code: RegionAwareCode,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
  IncidentCostGraphic,
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
  NextImage,
  PricingCTA,
  PageFeedback,
  CustomMetricPlayground,
  VerticalTabs,
  FAQAccordion,
  Button,
  DatadogPricingCalculator,
  DatadogVsSigNoz,
  GrafanaVsSigNoz,
  NewRelicVsSigNoz,
  DatadogAlternativesFinder,
  KeyPointCallout: ({ children, title, type, ...rest }) => (
    <Admonition
      {...rest}
      title={title === '' || title == null ? 'Note' : title}
      type={type ?? 'info'}
    >
      {children}
    </Admonition>
  ),
  GetStartedOpenTelemetryButton,
  InterlinkCard,
  InArticleVideoShowcaseModal,
  GetStartedInfrastructureMonitoring,
  ImageCTA,
  TrackingLink,
  Listicle,
  MDXButton,
  IconCardGrid,
  HostingDecision,
  ArticleSeriesBottom,
  ArticleSeriesTop,
  DashboardActions,
  OtelCollectorFlow,
  K8sInstall,
  K8sOtelDemo,
  RetentionInfo,
  SigNozCloud,
  UpgradeInfo,
  OtelOperatorOTLPEndpoint,
  OtelOperatorAutoInstrumentation,
  ResponseTimeVisualizer,
  ProductFeatureShowcase,
  CloneRepo,
  CommonPrerequisites,
  CardinalityExplosion,
  MemoryGauge,
  QueryRace,
  SamplingAggregation,
  UsersAnalogy,
  Tooltip,
  DatabaseTable,
  InlineCTA,
  MCPInstallButton,
  GetHelp,
  K8sNextSteps,
  MultiNodePart1,
  MultiNodePart2,
  PrereqsInstrument,
  TraefikMetrics,
  MetricsDefinition,
  CHClientWithOutput,
} as unknown as MDXComponents
