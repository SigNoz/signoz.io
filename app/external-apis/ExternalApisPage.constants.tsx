import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: "All Endpoints",
    description: "View every endpoint with call counts, latency, and error rates.",
    image: "/img/external-apis/all-endpoints.png",
    isActive: true
  },
  {
    id: 1,
    title: "Endpoint Stats",
    description: "View performance charts and dependent services.",
    image: "/img/external-apis/endpoint-stats.png",
    isActive: false
  },
  // {
  //   id: 2,
  //   title: "APM → Logs",
  //   description: "Go from APM metrics to related logs.",
  //   image: "/img/log-management/APM-to-Logs.png",
  //   isActive: false
  // }
];