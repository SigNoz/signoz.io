import React from 'react'
import MainSection from './Kubecon'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    absolute: 'KubeCon + CloudNativeCon North America 2024 | SigNoz',
  },
  openGraph: {
    title: 'KubeCon + CloudNativeCon North America 2024 | SigNoz',
    description: "Join us at KubeCon North America from Nov 12 to Nov 15. We're thrilled to share that 7 talks from the SigNoz Team have been selected. Come meet us at one of our talks or after parties, we would love to host you.",
    images: '/img/kubecon/kubecon-cover.webp'
  },
  description:
    "Join us at KubeCon North America from Nov 12 to Nov 15. We're thrilled to share that 7 talks from the SigNoz Team have been selected. Come meet us at one of our talks or after parties, we would love to host you.",
  twitter: {
    title: 'KubeCon + CloudNativeCon North America 2024 | SigNoz',
    description: "Join us at KubeCon North America from Nov 12 to Nov 15. We're thrilled to share that 7 talks from the SigNoz Team have been selected. Come meet us at one of our talks or after parties, we would love to host you.",
    images: '/img/kubecon/kubecon-cover.webp'
  }
}

export default function LaunchWeekPage() {
  return <MainSection />
} 