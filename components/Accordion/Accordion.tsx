import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

const Accordion = ({ topic, subtopics, onLinkClick }) => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false)

  return (
    <div className="hover:bg-muted -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold">
      <button
        onClick={() => setAccordionIsOpen(!accordionIsOpen)}
        className="flex w-full items-center gap-1"
      >
        <span>{topic}</span>
        {accordionIsOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      <div
        className={`text-muted-foreground grid overflow-hidden text-sm transition-all duration-300 ease-in-out ${
          accordionIsOpen ? 'grid-rows-[1fr] py-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 overflow-hidden">
          {subtopics.map((subtopic, index) => (
            <TrackingLink
              key={index}
              href={subtopic.url}
              className="text-muted-foreground flex items-center gap-2"
              clickType="Nav Click"
              clickName={`${subtopic.name} Link`}
              clickText={subtopic.name}
              clickLocation={`${topic} Dropdown`}
              onClick={() => onLinkClick && onLinkClick()}
              prefetch={false}
            >
              {subtopic.icon &&
                (typeof subtopic.icon === 'string' ? (
                  <img src={subtopic.icon} alt={`${subtopic.name} icon`} className="h-5 w-5" />
                ) : (
                  subtopic.icon
                ))}
              <div className="flex flex-col">
                <span className="font-medium">{subtopic.name}</span>
                <span className="text-xs text-gray-500">{subtopic.description}</span>
              </div>
            </TrackingLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Accordion
