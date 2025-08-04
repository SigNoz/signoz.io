import { ProductDropdownItem } from "./constants"
import TrackingLink from "../TrackingLink"
import { ArrowRight } from "lucide-react"
import { Color } from "@signozhq/design-tokens"
import Image from "next/image"

const ModuleNavItems = ({ items, handleDropdownClick }: { items: ProductDropdownItem[], handleDropdownClick?: () => void }) => {
  return (
    <>
      {(items ?? [])?.map((item) => (
        <TrackingLink
          href={item?.url}
          className="group flex h-auto items-center gap-4"
          key={item?.key}
          clickType="Nav Click"
          clickName={`${item?.name} Product Link`}
          clickText={item?.name}
          clickLocation="Top Navbar"
          onClick={handleDropdownClick}
        >
          {item?.icon && (
            <Image
              src={item?.icon}
              alt={item?.name}
              width={20}
              height={20}
            />
          )}
          <div>
            <div className="flex flex-row items-center gap-1">
              <span>{item?.name}</span>{' '}
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100"
              />
            </div>
            <div
              className={`line-clamp-2 max-w-[274px] text-xs text-[${Color.TEXT_VANILLA_400}]  group-hover:text-[#FFF]`}
            >
              {item?.description}
            </div>
          </div>
        </TrackingLink>
      ))}
    </>
  )
}

export default ModuleNavItems