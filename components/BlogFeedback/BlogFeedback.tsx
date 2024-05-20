import { InfoIcon, PenBox, ThumbsDown, ThumbsDownIcon, ThumbsUp } from 'lucide-react'
import * as React from 'react'

interface ButtonProps {
  icon: React.ReactNode
  text: string
}

const Button: React.FC<ButtonProps> = ({ icon, text }) => {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-full bg-signoz_ink-400 bg-opacity-10 px-2 py-1  dark:bg-stone-300">
      {icon}
      <div className="text-xs text-signoz_robin-500">{text}</div>
    </div>
  )
}

const BlogFeedback: React.FC = () => {
  const buttons: ButtonProps[] = [
    {
      icon: <ThumbsUp color="#6366f1" size={14} />,
      text: 'Yes',
    },
    {
      icon: <ThumbsDown color="#6366f1" size={14} />,
      text: 'No',
    },
    {
      icon: <PenBox color="#6366f1" size={14} />,
      text: 'Send feedback',
    },
  ]

  return (
    <div className="mt-8 flex flex-col justify-center rounded border border-solid border-signoz_vanilla-300 bg-signoz_vanilla-100 px-4 py-4 text-stone-300 dark:border-gray-900 dark:bg-signoz_ink-400">
      <div className="flex w-full items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex items-center gap-2.5 self-start text-base leading-6 tracking-normal">
          <InfoIcon size={14} />
          <div className="text-sm text-signoz_robin-500">Was this article helpful?</div>
        </div>
        <div className="flex gap-2 text-sm leading-5 tracking-normal">
          {buttons.slice(0, 2).map((button, index) => (
            <Button key={index} icon={button.icon} text={button.text} />
          ))}
          <div className="h-7 w-px shrink-0 border border-solid  dark:border-zinc-800 dark:bg-zinc-800" />
          <Button icon={buttons[2].icon} text={buttons[2].text} />
        </div>
      </div>
    </div>
  )
}

export default BlogFeedback
