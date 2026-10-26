import React from 'react'
import { InfoCardListProps } from './InfoCardList.types'

const InfoCardList: React.FC<InfoCardListProps> = ({ cards }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)] p-4"
        >
          <h3 className="mb-2 text-base font-medium text-[var(--l1-foreground)]">{card.title}</h3>
          <p className="mb-0 text-sm font-normal text-[var(--l2-foreground)]">{card.description}</p>
        </div>
      ))}
    </div>
  )
}

export default InfoCardList
