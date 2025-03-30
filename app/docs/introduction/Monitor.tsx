'use client'

import React from 'react'
import {
	ArrowRight,
	MonitorSmartphone,
	CloudCog,
	DatabaseZap,
	BrainCircuit,
	Box,
    Server,
	LucideBoxes,
} from 'lucide-react'
import {
	SiKubernetes,
	SiAmazonwebservices,
	SiGooglecloud,
	SiReact,
	SiAndroid,
	SiApachekafka,
} from 'react-icons/si'
import TrackingLink from '../../../components/TrackingLink'

interface MonitorLink {
	name: string
	href: string
	icon: React.ReactNode
	clickName: string
}

interface CardData {
	title: string
	description: string
	href?: string
	icon: React.ReactNode
	clickName: string
	clickText: string
	links: MonitorLink[]
}

export default function Monitor() {
	const cardData: CardData[] = [
		{
			title: 'Infrastructure',
			description: 'Monitor your infrastructure and resources',
			href: '/docs/infrastructure-monitoring/overview/',
			icon: <LucideBoxes size={20} className="text-signoz_robin-500" />,
			clickName: 'Infrastructure Card',
			clickText: 'Infrastructure',
			links: [
				{
					name: 'Host Monitoring',
					href: '/docs/userguide/hostmetrics/',
					icon: <Server className="w-5 h-5 text-orange-500" />,
					clickName: 'Host Monitoring Link',
				},
				{
					name: 'Kubernetes',
					href: '/docs/userguide/k8s-metrics/',
					icon: <SiKubernetes className="w-5 h-5 text-blue-600" />,
					clickName: 'Kubernetes Monitoring Link',
				},
			],
		},
		{
			title: 'Monitor Cloud',
			description: 'Track your cloud resources and services',
			icon: <CloudCog size={20} className="text-signoz_robin-500" />,
			clickName: 'Monitor Cloud Card',
			clickText: 'Monitor Cloud',
			links: [
				{
					name: 'AWS',
					href: '/docs/ec2-monitoring/',
					icon: <SiAmazonwebservices className="w-5 h-5 text-orange-500" />,
					clickName: 'AWS Monitoring Link',
				},
				{
					name: 'Azure',
					href: '/docs/azure-monitoring/',
					icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
					clickName: 'Azure Monitoring Link',
				},
				{
					name: 'GCP',
					href: '/docs/gcp-monitoring/',
					icon: <SiGooglecloud className="w-5 h-5 text-red-500" />,
					clickName: 'GCP Monitoring Link',
				},
			],
		},
		{
			title: 'Specialized Monitoring',
			description: 'Monitor specialized services and applications',
			icon: <DatabaseZap size={20} className="text-signoz_robin-500" />,
			clickName: 'Specialized Monitoring Card',
			clickText: 'Specialized Monitoring',
			links: [
				{
					name: 'Frontend',
					href: '/docs/frontend-monitoring/opentelemetry-web-vitals/',
					icon: <SiReact className="w-5 h-5 text-blue-400" />,
					clickName: 'Frontend Monitoring Link',
				},
				{
					name: 'Mobile',
					href: '/docs/frontend-and-mobile-monitoring/', 
					icon: <SiAndroid className="w-5 h-5 text-green-500" />,
					clickName: 'Mobile Monitoring Link',
				},
				{
					name: 'LLMs',
					href: '/docs/community/llm-monitoring/', 
					icon: <BrainCircuit className="w-5 h-5 text-purple-600" />,
					clickName: 'LLMs Monitoring Link',
				},
				{
					name: 'Queues',
					href: '/docs/messaging-queues/kafka/', 
					icon: <SiApachekafka className="w-5 h-5 text-black dark:text-white" />,
					clickName: 'Queues Monitoring Link',
				},
			],
		},
	]

	return (
		<div className="mb-12 w-full max-w-7xl mx-auto">
			<div className="text-left mb-6">
				<h2 className="text-2xl font-semibold mb-2 text-signoz_vanilla-100">
					Monitor your applications
				</h2>
				<p className="text-signoz_vanilla-400 text-base">
					Monitor your infrastructure, cloud services, and applications
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-4">
				{cardData.map((card, index) => {
					// Card is clickable and trackable only if it has a valid href
					const isCardClickable = !!card.href

					const CardWrapper = isCardClickable ? TrackingLink : 'div'
					const wrapperProps = {
						key: index,
						className:
							'flex flex-col p-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 hover:bg-signoz_ink-300 hover:border-signoz_robin-500 transition-all',
						...(isCardClickable
							? {
									href: card.href,
									clickType: 'Card Click',
									clickName: card.clickName,
									clickText: card.clickText,
									clickLocation: 'Monitor Section',
							  }
							: {}),
					}

					return (
						// @ts-expect-error - Dynamically switching component type
						<CardWrapper {...wrapperProps}>
							<div className="flex items-center gap-2 mb-4">
								<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-signoz_robin-500/10 text-signoz_robin-500">
									{card.icon}
								</div>
								<div>
									<h3 className="font-bold mb-1 text-base text-signoz_vanilla-100">
										{card.title}
									</h3>
									<p className="text-sm mb-0 text-signoz_vanilla-400">
										{card.description}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3 my-2">
								{card.links.map((link, linkIndex) => (
									<TrackingLink
										key={linkIndex}
										href={link.href}
										className="flex items-center gap-2 p-2 rounded-md hover:bg-signoz_robin-500/10 transition-colors"
										clickType="Secondary CTA"
										clickName={link.clickName}
										clickText={link.name}
										clickLocation="Monitor Section"
									>
										{link.icon}
										<span className="text-sm text-signoz_vanilla-100">{link.name}</span>
										<ArrowRight className="ml-1 h-3 w-3 text-signoz_vanilla-400" />
									</TrackingLink>
								))}
							</div>
							{/* Optional: Add a 'View All' link if needed */}
							{/* <div className="mt-auto text-sm">
			              <div className="text-signoz_robin-500 inline-flex items-center hover:text-signoz_robin-400 transition-colors">
			                View all options <ArrowRight className="ml-1 h-3 w-3" />
			              </div>
			            </div> */}
						</CardWrapper>
					)
				})}
			</div>
		</div>
	)
}
