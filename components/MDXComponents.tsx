import { type MDXComponents } from 'mdx/types'

import 'katex/dist/katex.min.css'

// Chart components
import {
  AreaChart,
  BarChart,
  LineChart,
} from '@/components/shared/Charts/Charts'

import ArticleSeriesBottom from './ArticleSeries/ArticleSeriesBottom'
import ArticleSeriesTop from './ArticleSeries/ArticleSeriesTop'
import Admonition from './Admonition/Admonition'
import CardContainer from './Card/CardContainer'
import ProductRoadmap from './ProductRoadmap/ProductRoadmap'
import DocCardContainer from './Card/DocCardContainer'
import CtaContainer from './Cta/CtaContainer'
import DatadogMigration from './DatadogMigration/DatadogMigration'
import SubMenu from './DropDown/SubMenu'
import FeatureDiagram from './FeatureDiagram/FeatureDiagram'
import Figure from './Figure/Figure'
import GetStartedSigNoz from './GetStartedSigNoz/GetStartedSigNoz'
import IconCardGrid from './Card/IconCardGrid'
import Image from './shared/Image/Image'
import InlineCode from './InlineCode/InlineCode'
import InstallationInstructions from './GetStartedSigNoz/InstallationInstructions'
import LogsPerformanceTest from './LogsPerformanceTest/LogsPerformanceTest'
import { Pre } from './Pre/Pre'
import ZoomableImage from './shared/ZoomableImage/ZoomableImage'
import LoomVideo from './LoomVideo/LoomVideo'
import SigNozDashboard from './SigNozDashboard/SigNozDashboard'
import TabItem from './Tabs/TabItem'
import Tabs from './Tabs/Tabs'
import TOCInline from './TOCInline/TOCInline'
import Tweet from './Tweet/Tweet'
import YouTube from './YouTube/YouTube'
import LiteYoutubeEmbed from './LiteYoutubeEmbed/LiteYoutubeEmbed'
import IntegrationsDropdown from './IntegrationsDropdown/IntegrationsDropdown'
import IntegrationsListicle from './IntegrationsListicle/IntegrationsListicle'
import OSAndCloudListicle from './Onboarding/OSAndCloudListicle'
import FrameworksListicle from './Onboarding/FrameworksListicle'
import LanguageListicle from './Onboarding/LanguageListicle'
import DatabaseListicle from './Onboarding/DatabaseListicle'
import InfraMetricsListicle from './Onboarding/InfraMetricsListicle'
import MessagingQueuesListicle from './Onboarding/MessagingQueuesListicle'
import K8sInstallationListicle from './Setup/K8sInstallationListicle'
import MigrateToSigNoz from './MigrateToSigNoz/MigrateToSigNozOverview'
import DashboardTemplatesListicle from './Dashboards/DashboardTemplatesListicle'
import DashboardActions from './Dashboards/DashboardActions'
import KubernetesDashboardsListicle from './Dashboards/KubernetesDashboardsListicle'
import APMDashboardsListicle from './Dashboards/APMDashboardsListicle'
import HostMetricsDashboardsListicle from './Dashboards/HostMetricsDashboardsListicle'

export const components: MDXComponents = {
  Image,
  YouTube,
  LiteYoutubeEmbed,
  AreaChart,
  BarChart,
  LineChart,
  Tweet,
  LoomVideo,
  SigNozDashboard,
  LogsPerformanceTest,
  FeatureDiagram,
  Figure,
  ZoomableImage,
  Admonition,
  Tabs,
  TabItem,
  InlineCode,
  pre: Pre,
  TOCInline,
  ProductRoadmap,
  GetStartedSigNoz,
  DatadogMigration,
  InstallationInstructions,
  SubMenu,
  IconCardGrid,
  IntegrationsDropdown,
  IntegrationsListicle,
  CardContainer,
  DocCardContainer,
  CtaContainer,
  OSAndCloudListicle,
  FrameworksListicle,
  LanguageListicle,
  DatabaseListicle,
  InfraMetricsListicle,
  MessagingQueuesListicle,
  K8sInstallationListicle,
  ArticleSeriesBottom,
  ArticleSeriesTop,
  MigrateToSigNoz,
  DashboardTemplatesListicle,
  DashboardActions,
  KubernetesDashboardsListicle,
  APMDashboardsListicle,
  HostMetricsDashboardsListicle,
}