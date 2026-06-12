import Image, { StaticImageData } from 'next/image'
import { IconGridProps } from './IconGrid.types'

function isImageSrc(src: unknown): src is string | StaticImageData {
  return typeof src === 'string' || (typeof src === 'object' && src !== null && 'src' in src)
}

const IconGrid: React.FC<IconGridProps> = ({ icons, title, className = '' }) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">{title}</h3>
      <div className="flex items-center justify-start gap-4">
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center">
            {isImageSrc(icon.src) ? (
              <Image src={icon.src} alt={icon.alt} className="h-8" width={32} height={32} />
            ) : (
              (icon.src as React.ReactNode)
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconGrid
