export default function ListicleIcon({ src }: { src: string }) {
  return (
    <div className="listicle-icon mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
      <img src={src} alt="" className="no-theme-invert h-7 w-7 object-contain" loading="lazy" />
    </div>
  )
}
