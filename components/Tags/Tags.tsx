import './Tags.styles.css'

export default function Tags({ tags }: { tags: string[] }) {
  if (!tags || (tags && Array.isArray(tags) && tags.length <= 0) || !Array.isArray(tags)) {
    return null
  }

  return (
    <div className="tags">
      <h4 className="title m-0 font-bold"> Tags: </h4>
      {tags &&
        tags.map((tag) => (
          <div className="tag" key={tag}>
            {tag}
          </div>
        ))}
    </div>
  )
}
