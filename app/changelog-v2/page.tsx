import ChangelogRenderer from '@/components/ChangelogRenderer/ChangelogRenderer'
import { fetchChangelogEntries } from '../../utils/strapi'

// const markdown = `
// May 8, 2025\n# External API monitoring, new dashboards and more\n\n![feature-graphic-2.webp](http://localhost:1337/uploads/feature_graphic_2_a9a37a3068.webp)\n\n## External API Monitoring\n\nWe've spent the last couple of months [rebuilding](https://google.com) search from the ground up. The UI has been refined. We've improved how we display results as well as the accuracy, for instance for words split with / or _. You can now reliably use \"phrase matching\", -negative keywords AND boolean operators in your search queries.\n\nNot only that, but results will show comments, documents, and projects as well as issues.\n\n## Fixes & Improvements\n\n- We've spent the last couple of months rebuilding search from the ground up.\n- We've spent the last couple of months rebuilding search from the ground up.\n- We've spent the last couple of months rebuilding search from the ground up.
// `

const Changelog: React.FC = async () => {
  const changelogEntries = await fetchChangelogEntries()

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
    </section>
  )
}

export default Changelog
