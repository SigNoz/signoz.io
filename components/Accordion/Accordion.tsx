import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

const Accordion = ({ topic, subtopics, onLinkClick }) => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false)

  return (
    <div className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 hover:bg-[#18181B]">
      <button
        onClick={() => setAccordionIsOpen(!accordionIsOpen)}
        className="flex w-full items-center gap-1"
      >
        <span>{topic}</span>
        {accordionIsOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      <div
        className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-300 ease-in-out ${
          accordionIsOpen ? 'grid-rows-[1fr] py-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 overflow-hidden">
          {subtopics.map((subtopic, index) => (
            <TrackingLink
              key={index}
              href={subtopic.url}
              className="flex items-center gap-2 text-signoz_vanilla-300"
              clickType="Nav Click"
              clickName={`${subtopic.name} Link`}
              clickText={subtopic.name}
              clickLocation={`${topic} Dropdown`}
              onClick={() => onLinkClick && onLinkClick()}
            >
              {subtopic.icon && (
                <img src={subtopic.icon} alt={`${subtopic.name} icon`} className="h-5 w-5" />
              )}
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
