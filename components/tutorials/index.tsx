import React from 'react'
import Heading from '../../components/ui/Heading'
import { YouTube } from 'react-lite-yt-embed'

const Tutorials = () => {
  const TUTORIALS_LIST = [
    {
      youtubeId: 'oQFMfEc9JNI',
      desc: 'Using an open source standard frees you from vendor lock-in.',
    },
    {
      youtubeId: 'u2PiWKEdjCw',
      desc: 'Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.Using an open source standard frees you from vendor lock-in.',
    },
    {
      youtubeId: 'CgByZJeuRZY',
      desc: 'Using an open source standard frees you from vendor lock-in.',
    },
  ]

  return (
    <section>
      <div className="container my-16">
        <div className="mb-5 flex flex-col items-center">
          <Heading type={4}>LEARN</Heading>
          <Heading type={1}>Tutorials</Heading>
        </div>
        <div className="row">
          {TUTORIALS_LIST.map((tutorial) => (
            <div key={tutorial.youtubeId} className="col col--4">
              <div className="card-demo margin--sm">
                <div className="card bluish-gradient rounded-lg">
                  <div className="card__body p-0">
                    <div className="flex flex-col gap-5">
                      <YouTube id={tutorial.youtubeId} mute={false} />
                      <p className="line-clamp-2 text-ellipsis px-5">{tutorial.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tutorials
