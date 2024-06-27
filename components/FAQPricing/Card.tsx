import { LucidePlus, X } from 'lucide-react'
import React, { useState } from 'react'

const Card = ({ title, body }: CardProps): JSX.Element => {
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
        }}
        className=""
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
            className="font-bold text-signoz_vanilla-100 w-9/12"
          >
            {title}
          </div>

          <div className="text-signoz_vanilla-400">
            {!isActive ? <LucidePlus /> : <X />}
          </div>
        </div>
        {isActive && (
          <div
            className="card__body text-signoz_vanilla-400"
            dangerouslySetInnerHTML={{ __html: body }}
          >
            { }
          </div>
        )}
      </div>
    </div>
  )
}

interface CardProps {
  title: string
  body: string
}

export default Card
