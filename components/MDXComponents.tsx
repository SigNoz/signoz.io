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
import Button from './Button/Button'
import DatadogPricingCalculator from './DatadogPricingCalculator/DatadogPricingCalculator'
import DatadogVsSigNoz from './DatadogVsSigNoz/DatadogVsSigNoz'
import GrafanaVsSigNoz from './GrafanaVsSigNoz/GrafanaVsSigNoz'
import NewRelicVsSigNoz from './NewRelicVsSigNoz/NewRelicVsSigNoz'
import DatadogAlternativesFinder from './DatadogAlternativesFinder/DatadogAlternativesFinder'
import KeyPointCallout from './KeyPointCallout/KeyPointCallout'
import GetStartedOpenTelemetryButton from './GetStartedOpenTelemetryButton/GetStartedOpenTelemetryButton'
import InterlinkCard from './InterlinkCard/InterlinkCard'
import InArticleVideoShowcaseModal from './InArticleVideoShowcaseModal/InArticleVideoShowcaseModal'
import GetStartedInfrastructureMonitoring from './GetStartedInfrastructureMonitoring/GetStartedInfrastructureMonitoring'
import ImageCTA from './ImageCTA/ImageCTA'
import TrackingLink from './TrackingLink'
import APMQuickStartOverview from './APM/APMQuickStartOverview'
import APMInstrumentationListicle from './APM/APMInstrumentationListicle'
import JavascriptInstrumentationListicle from './APM/JavascriptInstrumentationListicle'
import LibraryTabs from './LibraryTabs/LibraryTabs'
import LibraryTab from './LibraryTabs/LibraryTab'
import MDXButton from './MDXButton/MDXButton'
import IconCardGrid from './Card/IconCardGrid'
import LogsQuickStartOverview from './Logs/LogsQuickStartOverview'
import LogsInstrumentationListicle from './Logs/LogsInstrumentationListicle'
import IntegrationsListicle from './Integrations/IntegrationsListicle'
import HostingDecision from './shared/HostingDecision'
import SelfHostInstallationListicle from './Setup/SelfHostInstallationListicle'
import K8sInstallationListicle from './Setup/K8sInstallationListicle'
import MarketplaceInstallationListicle from './Setup/MarketplaceInstallationListicle'
import CollectionAgentsListicle from './Setup/CollectionAgentsListicle'

import ArticleSeriesBottom from './ArticleSeries/ArticleSeriesBottom'
import ArticleSeriesTop from './ArticleSeries/ArticleSeriesTop'
import MigrateToSigNoz from './MigrateToSigNoz/MigrateToSigNozOverview'
import DashboardTemplatesListicle from './Dashboards/DashboardTemplatesListicle'
import DashboardActions from './Dashboards/DashboardActions'
import KubernetesDashboardsListicle from './Dashboards/KubernetesDashboardsListicle'
import APMDashboardsListicle from './Dashboards/APMDashboardsListicle'
import HostMetricsDashboardsListicle from './Dashboards/HostMetricsDashboardsListicle'
import LiteLLMDashboardsListicle from './Dashboards/LiteLLMDashboardsListicle'
import ProductFeatureShowcase from './ProductFeatureShowcase/ProductFeatureShowcase'

import LLMMonitoringListicle from './LLMMonitoring/LLMMonitoringListicle'
import OtelCollectorFlow from './OtelCollectorFlow/OtelCollectorFlow'

import ResponseTimeVisualizer from './APMMetrics/ResponseTimeVisualizer'
import MetricsQuickStartOverview from './Metrics/MetricsQuickStartOverview'
import CICDMonitoringListicle from './CICD/CICDMonitoringListicle'
import ToggleHeading from './Headings/ToggleHeading'

export const components: MDXComponents = {
  ToggleHeading,
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
  Button,
  DatadogPricingCalculator,
  DatadogVsSigNoz,
  GrafanaVsSigNoz,
  NewRelicVsSigNoz,
  DatadogAlternativesFinder,
  KeyPointCallout,
  GetStartedOpenTelemetryButton,
  InterlinkCard,
  InArticleVideoShowcaseModal,
  GetStartedInfrastructureMonitoring,
  ImageCTA,
  TrackingLink,
  APMQuickStartOverview,
  APMInstrumentationListicle,
  JavascriptInstrumentationListicle,
  LibraryTabs,
  LibraryTab,
  MDXButton,
  IconCardGrid,
  LogsQuickStartOverview,
  LogsInstrumentationListicle,
  IntegrationsListicle,
  HostingDecision,
  SelfHostInstallationListicle,
  K8sInstallationListicle,
  ArticleSeriesBottom,
  ArticleSeriesTop,
  MigrateToSigNoz,
  DashboardTemplatesListicle,
  DashboardActions,
  KubernetesDashboardsListicle,
  APMDashboardsListicle,
  HostMetricsDashboardsListicle,
  LiteLLMDashboardsListicle,
  MarketplaceInstallationListicle,
  LLMMonitoringListicle,
  OtelCollectorFlow,
  CollectionAgentsListicle,
  ResponseTimeVisualizer,
  ProductFeatureShowcase,
  MetricsQuickStartOverview,
  CICDMonitoringListicle,
}
