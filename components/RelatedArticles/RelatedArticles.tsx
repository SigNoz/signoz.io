import * as React from 'react'

interface ArticleCardProps {
  title: string
  level: string
  date: string
  authorName: string
  authorImage: string
  readTime: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  level,
  date,
  authorName,
  authorImage,
  readTime,
}) => {
  return (
    <div className="flex w-[33%] flex-col max-md:ml-0 max-md:w-full">
      <article className="dark:bg-signoz_ink-400 mx-auto flex w-full grow flex-col rounded border border-solid p-4 dark:border-gray-900 max-md:mt-6">
        <h3 className="text-signoz_ink-300 text-base font-medium leading-6 dark:text-neutral-100">
          {title}
        </h3>
        <div className="mt-3 flex gap-2 text-xs font-medium uppercase leading-5 tracking-wide">
          <div className="justify-center whitespace-nowrap rounded-full bg-opacity-10 px-2.5 py-1 dark:text-stone-400">
            {level}
          </div>
          <div className="justify-center rounded-full bg-slate-500 bg-opacity-10 px-2.5 py-1 dark:bg-stone-300 dark:text-slate-950">
            {date}
          </div>
        </div>
        <div className="mt-20 flex w-full justify-between gap-5 py-px text-sm leading-5 max-md:mt-10">
          <div className="text-signoz_ink-300 flex gap-1.5 font-medium dark:text-white">
            <div>{authorName}</div>
          </div>
          <div className="flex gap-1.5 whitespace-nowrap text-stone-300">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a9f62d9d08b5fba16d4c31faa1048ab8b1f3bb5625d9592be406120b1670be3?apiKey=f0103e73688241f896979b7df0e7cb45&"
              alt=""
              className="my-auto aspect-square w-3.5 shrink-0"
            />
            <div>{readTime}</div>
          </div>
        </div>
      </article>
    </div>
  )
}

const RelatedArticles: React.FC = () => {
  const articles = [
    {
      title: 'Kubectl Top Pod/Node | How to get & read resource utilization metrics of K8s?',
      level: 'Advanced',
      date: 'jan 21, 2024',
      authorName: 'John Doe',
      authorImage:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/bb2968ffaa7026e93a9974a711b14257155172621dddaedf55950a62eb028f82?apiKey=f0103e73688241f896979b7df0e7cb45&',
      readTime: '6m',
    },
    {
      title: 'Using Kubectl Logs | Complete Guide to viewing Kubernetes Pod Logs',
      level: 'beginner',
      date: 'jan 21, 2024',
      authorName: 'John Doe',
      authorImage:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/e3e2fb809af510e3c6593aede9b82863ebeae0fe5f3c49da656b12e7f404804f?apiKey=f0103e73688241f896979b7df0e7cb45&',
      readTime: '6m',
    },
    {
      title: 'Using Kubectl Logs | Complete Guide to viewing Kubernetes Pod Logs',
      level: 'beginner',
      date: 'jan 21, 2024',
      authorName: 'John Doe',
      authorImage:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/48267979c68b7c5b581c81f5ddb47468f567f724654dc5637a4ca329aa0845b4?apiKey=f0103e73688241f896979b7df0e7cb45&',
      readTime: '6m',
    },
  ]

  return (
    <div className="my-8 flex flex-col">
      <header className="w-full px-5 text-sm font-semibold uppercase leading-5 tracking-wide text-gray-700 max-md:max-w-full">
        related articles
      </header>
      <section className="mt-5 w-full px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RelatedArticles
