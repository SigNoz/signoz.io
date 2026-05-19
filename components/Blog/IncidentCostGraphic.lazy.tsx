'use client'

import dynamic from 'next/dynamic'

const IncidentCostGraphic = dynamic(() => import('./IncidentCostGraphic'), {
  ssr: false,
})

export default IncidentCostGraphic
