/**
 * Region shapes and the built-in region list.
 *
 * Kept out of RegionContext so server code can read it too: the context is a
 * client component, and the docs markdown export needs the same rows to render
 * the region table without a browser.
 */

export interface Cluster {
  cloud_provider: string
  cloud_region: string
}

export interface RegionData {
  name: string
  dns: string
  clusters: Cluster[]
}

/**
 * Seeds the region table and dropdown before the control plane responds, and
 * stands in when that request fails. Keep in sync with the control plane's
 * /regions payload.
 */
export const FALLBACK_REGIONS: RegionData[] = [
  {
    name: 'us',
    dns: 'us.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'us-central1',
      },
    ],
  },
  {
    name: 'eu',
    dns: 'eu.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'europe-central2',
      },
    ],
  },
  {
    name: 'in',
    dns: 'in.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'asia-south1',
      },
    ],
  },
]

/** One row per region/cluster pair, matching the rendered table's columns. */
export const regionTableRows = (regions: RegionData[]) =>
  regions.flatMap((region) =>
    region.clusters.map((cluster) => ({
      name: region.name,
      cloudRegion: cluster.cloud_region,
      provider: cluster.cloud_provider,
      dns: `https://ingest.${region.dns}`,
    }))
  )
