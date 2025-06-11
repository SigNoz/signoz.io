import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import ChangelogFooter from '@/components/Changelog/Footer/ChangelogFooter'
import { fetchChangelogEntries } from '../../utils/strapi'
import Styles from './styles.module.css'

const Changelog = async () => {
  const changelogsResponse = await fetchChangelogEntries({ page: 1, pageSize: 2 })

  return (
    <section className="relative mx-auto  flex w-full max-w-7xl flex-col gap-7 pb-16 pt-14">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-signoz_vanilla-100">Changelog</h1>
        <div className={`flex items-center gap-4 ${Styles['subscribe-cta-container']}`}>
          <p>Subscribe for updates</p>
          <span className="block h-1 w-1 rounded-full bg-signoz_slate-200" />
          <p className="text-base text-signoz_vanilla-400">Follow us on Twitter</p>
        </div>
      </div>
      <div className="flex max-w-4xl flex-col">
        {changelogsResponse &&
          changelogsResponse.changelogs.map((entry) => (
            <ChangelogRenderer key={entry.id} changelog={entry} />
          ))}
      </div>
      <ChangelogFooter pagination={changelogsResponse.pagination} />
    </section>
  )
}

export default Changelog
