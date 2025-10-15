import Image from "next/image"
import { IconGridProps } from "./IconGrid.types"

const IconGrid: React.FC<IconGridProps> = ({ icons, title, className = '' }) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">{title}</h3>
      <div className="flex justify-start items-center gap-4">
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center">
            {typeof icon.src === 'string' ? (
              <Image src={icon.src} alt={icon.alt} className="h-8" width={32} height={32} />
            ) : (
              icon.src
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconGrid