import { type ReactNode } from 'react'
import OpenTelemetryHubShellClient from './OpenTelemetryHubShellClient'

export default function OpenTelemetryHubRoutesLayout({ children }: { children: ReactNode }) {
  return <OpenTelemetryHubShellClient>{children}</OpenTelemetryHubShellClient>
}
