import React from 'react'

interface NewsletterSubscriptionProps {
  subscriptionUrl?: string
  showBorder?: boolean
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  subscriptionUrl = 'https://newsletter.signoz.io/embed',
  showBorder = true,
}) => {
  return (
    <div
      className={`mx-auto max-w-4xl overflow-hidden ${showBorder ? 'border-border/40 border' : 'border-0 shadow-none'} bg-card/50 rounded-md backdrop-blur-sm`}
    >
      <div className="p-0">
        <iframe
          src={subscriptionUrl}
          width="100%"
          height="320"
          style={{
            border: 'none',
            overflow: 'hidden',
            background: 'transparent',
          }}
          title="Newsletter subscription"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default NewsletterSubscription
