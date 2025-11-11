import { Metadata } from 'next';
import KubeconPage from './KubeconPage';

export const metadata: Metadata = {
  title: 'Meet SigNoz at KubeCon 2025 Atlanta - Booth 1372',
  description: 'Visit SigNoz at KubeCon 2025 in Atlanta (Nov 10-13), booth 1372. Meet Olly for mystery boxes & merch. Catch talks on OpenTelemetry, CI/CD observability & agentic flows with MCP.',
  openGraph: {
    images: ['/img/events/kubecon-cloudnativecon-north-america-2025/meta-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/events/kubecon-cloudnativecon-north-america-2025/meta-image.png'],
  },
}

const Kubecon: React.FC = () => {
  return <KubeconPage />;
};

export default Kubecon;
