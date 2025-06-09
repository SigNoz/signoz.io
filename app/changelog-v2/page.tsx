import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import ChangelogFooter from '@/components/Changelog/Footer/ChangelogFooter'
import { DeploymentType, fetchChangelogEntries } from '../../utils/strapi'

const Changelog = async () => {
  const changelogEntries = await fetchChangelogEntries(DeploymentType.CLOUD_ONLY)

  return (
    <section className="container mx-auto mt-8 flex w-full flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-signoz_vanilla-100">Changelog</h1>
        <div className="flex items-center gap-4">
          <p>Subscribe for updates</p>
          <span className="block h-1 w-1 rounded-full bg-signoz_slate-200" />
          <p>Follow us on Twitter</p>
        </div>
      </div>
      <div className="flex max-w-4xl flex-col">
        {changelogEntries.map((entry) => (
          <ChangelogRenderer key={entry.id} changelog={entry} />
        ))}
      </div>
      <ChangelogFooter />
    </section>
  )
}

export default Changelog
