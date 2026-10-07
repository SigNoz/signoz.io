import DirectoryCard from './DirectoryCard'
import type { DirectorySection } from './ListicleDirectoryClient'

const GRID_BORDER = 'border-dashed border-[var(--l1-border)]'

// Cells draw right+bottom borders, the container draws top+left; fillers
// complete the last row per breakpoint so shared dashed borders stay continuous.
const fillersNeeded = (count: number, cols: number) => (cols - (count % cols)) % cols

const fillerClasses = (index: number, count: number) => {
  const md = index < fillersNeeded(count, 2) ? 'md:block' : 'md:hidden'
  const lg = index < fillersNeeded(count, 3) ? 'lg:block' : 'lg:hidden'
  return `hidden ${md} ${lg}`
}

export default function DirectorySectionGrid({ section }: { section: DirectorySection }) {
  return (
    <section id={section.id} className="scroll-mt-16">
      <h2 className="m-0 text-xl font-semibold text-[var(--l1-foreground)]">{section.title}</h2>
      {section.description && (
        <p className="mb-0 mt-1 text-base leading-[26px] text-[var(--l2-foreground)]">
          {section.description}
        </p>
      )}
      <ul
        className={`mt-4 grid list-none grid-cols-1 overflow-hidden rounded-lg border-l border-t ${GRID_BORDER} p-0 md:grid-cols-2 lg:grid-cols-3`}
      >
        {section.items.map((item, index) => (
          <DirectoryCard
            key={`${item.href}-${index}`}
            item={item}
            sectionName={section.sectionName}
          />
        ))}
        {[0, 1].map((filler) => (
          <li
            key={`filler-${filler}`}
            aria-hidden="true"
            className={`${fillerClasses(filler, section.items.length)} border-b border-r ${GRID_BORDER}`}
          />
        ))}
      </ul>
    </section>
  )
}
