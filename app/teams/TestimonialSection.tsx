import React from 'react'
import './styles.module.css'

const TestimonialSection: React.FC = () => {
  return (
    <div className="signup-testimonial flex flex-col max-md:w-full lg:w-[30%] xl:w-[40%]">
      <div className="signup-testimonial-bg" />
      <div className="z-10 my-auto flex flex-col items-start self-stretch p-16 px-12 py-32 text-xl text-stone-300 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ed7d4d9c492e5c7d2509409a4e7ecc93b7a259d8489c7ac37ac6871917c6f13?apiKey=f0103e73688241f896979b7df0e7cb45&"
          className="aspect-[4] w-28 max-w-full"
          alt="SigNoz logo"
        />
        <div className="testimonial-content mt-12 self-stretch text-signoz_sienna-200 max-md:mt-10 max-md:max-w-full">
          SigNoz balances flexibility and security extremely well. They've built clean and
          thoughtful abstractions over advanced security foundations, and the product just works. We
          barely have to think about it.
        </div>
        <footer className="mt-12 text-[20px] text-signoz_sienna-200 max-md:mt-10">
          <cite className="text-center font-medium not-italic leading-[140%]">Mike Hudak</cite>
          <p className="mt-2 text-center text-base leading-6">CTO ⎯ incident.io</p>
        </footer>
      </div>
    </div>
  )
}

export default TestimonialSection
