import { LucidePlus, X } from 'lucide-react'
import React, { useState, type JSX } from 'react'

const Card = ({ title, body, idx }: CardProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <div
        style={{
          padding: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#1D212D',
          borderBottom: 'hidden',
          borderLeft: 0,
          borderRight: 0,
          ...(idx === 0 ? { borderTop: 0 } : {}),
        }}
        onClick={() => setIsActive((state) => !state)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginLeft: '0.5rem',
            }}
            className="w-9/12 font-bold text-signoz_vanilla-100"
          >
            {title}
          </div>

          <div className="text-signoz_vanilla-400">{!isActive ? <LucidePlus /> : <X />}</div>
        </div>
        <div
          className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
            isActive ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div
            className="card__body p-4 text-signoz_vanilla-400"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  title: string
  body: string
  idx?: number
}

export default Card
