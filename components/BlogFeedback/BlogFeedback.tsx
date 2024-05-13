import * as React from 'react'

interface ButtonProps {
  icon: string
  text: string
}

const Button: React.FC<ButtonProps> = ({ icon, text }) => {
  return (
    <div className="bg-signoz_ink-400 flex cursor-pointer gap-1 whitespace-nowrap rounded-full bg-opacity-10 px-2.5 py-1 dark:bg-stone-300">
      <img loading="lazy" src={icon} alt="" className="my-auto aspect-square w-3.5 shrink-0" />
      <div>{text}</div>
    </div>
  )
}

const BlogFeedback: React.FC = () => {
  const buttons: ButtonProps[] = [
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/48d2bb2600de70d96aae657db8e83bc2d84e038f930f404aca56e8d1e6693bf0?apiKey=f0103e73688241f896979b7df0e7cb45&',
      text: 'Yes',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/10b82243b64605588eca48254a8f43aba58d67cda7600e24c84e45ede8d95d1d?apiKey=f0103e73688241f896979b7df0e7cb45&',
      text: 'No',
    },
    {
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d7871a591e6def7d77678e020b2cc97b4988f896554fd9c6908569e4aba5fe47?apiKey=f0103e73688241f896979b7df0e7cb45&',
      text: 'Send feedback',
    },
  ]

  return (
    <div className="dark:bg-signoz_ink-400 bg-signoz_vanilla-100 border-signoz_vanilla-300 mt-8 flex max-w-[899px] flex-col justify-center rounded border border-solid px-4 py-4 text-stone-300 dark:border-gray-900">
      <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex gap-2.5 self-start text-base leading-6 tracking-normal">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/92be7ae47230f8d2b95cb930f9eff28cf0927c02ea7f79c80de8acd9c5f1c3fd?apiKey=f0103e73688241f896979b7df0e7cb45&"
            alt="Helpful article icon"
            className="my-auto aspect-square w-4 shrink-0"
          />
          <div className="text-signoz_ink-300 dark:text-white">Was this article helpful?</div>
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
