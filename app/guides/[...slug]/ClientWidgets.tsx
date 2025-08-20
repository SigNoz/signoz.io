"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import client components with SSR enabled to preserve content
const PageFeedback = dynamic(() => import('@/components/PageFeedback/PageFeedback'), { 
  ssr: true,
  loading: () => null 
});

const GrafanaVsSigNozFloatingCard = dynamic(
  () => import('@/components/GrafanaVsSigNoz/GrafanaVsSigNozFloatingCard'), 
  { 
    ssr: true,
    loading: () => null 
  }
);

interface ClientWidgetsProps {
  showGrafanaCard?: boolean;
}

export default function ClientWidgets({ showGrafanaCard = false }: ClientWidgetsProps) {
  return (
    <>
      <Suspense fallback={null}>
        <PageFeedback />
      </Suspense>
      
      {showGrafanaCard && (
        <Suspense fallback={null}>
          <GrafanaVsSigNozFloatingCard />
        </Suspense>
      )}
    </>
  );
}