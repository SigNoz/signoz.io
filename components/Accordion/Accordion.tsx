import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ topic, subtopics }) => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);

  return (
    <div className='-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 hover:bg-signoz_ink-200'>
      <button
        onClick={() => setAccordionIsOpen(!accordionIsOpen)}
        className='flex gap-1 items-center w-full'
      >
        <span>{topic}</span>
        {accordionIsOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionIsOpen ? 'grid-rows-[1fr] opacity-100 py-4'
          : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className='overflow-hidden flex flex-col gap-4'>
          {subtopics.map((subtopic, index) => (
            <a key={index} href={subtopic.url} className='text-signoz_vanilla-300 flex items-center gap-2'>
              {subtopic.icon && (
                <img src={subtopic.icon} alt={`${subtopic.name} icon`} className="w-5 h-5" />
              )}
              <div className="flex flex-col">
                <span className="font-medium">{subtopic.name}</span>
                <span className="text-xs text-gray-500">{subtopic.description}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;

