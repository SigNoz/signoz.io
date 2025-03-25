import React from 'react'
import MainSection from './Kubecon'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    absolute: 'KubeCon + CloudNativeCon Europe 2025 | SigNoz',
  },
  openGraph: {
    title: 'KubeCon + CloudNativeCon Europe 2025 | SigNoz',
    description: "Join Team SigNoz at KubeCon + CloudNativeCon Europe in ExCeL London — we’ll be at booth S631 and would love to meet you!",
    images: '/img/events/kubecon/kubecon-cover-europe.webp'
  },
  description:
    "Join Team SigNoz at KubeCon + CloudNativeCon Europe in ExCeL London — we’ll be at booth S631 and would love to meet you!",
  twitter: {
    title: 'KubeCon + CloudNativeCon Europe 2025 | SigNoz',
    description: "Join Team SigNoz at KubeCon + CloudNativeCon Europe in ExCeL London — we’ll be at booth S631 and would love to meet you!",
    images: '/img/events/kubecon/kubecon-cover-europe.webp'
  }
}

export default function LaunchWeekPage() {
  return <MainSection />
} 