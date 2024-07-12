import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";
import { Button } from '@headlessui/react'
import { ArrowRight } from 'lucide-react'
import Link from "next/link";

const COMPANIES = [
  { image: "/img/users/netapp.svg", imageDesc: "netapp logo" },
  { image: "/img/users/samsung.svg", imageDesc: "samsung logo" },
  { image: "/img/users/comcast.svg", imageDesc: "comcast logo" },
  { image: "/img/users/freo.svg", imageDesc: "freo logo" },
  { image: "/img/users/hyperface.svg", imageDesc: "hyperface logo" },
  { image: "/img/users/salesforce.svg", imageDesc: "salesforce logo" },
  { image: "/img/users/rattle.svg", imageDesc: "rattle logo" },
  { image: "/img/users/webstaurantstore.svg", imageDesc: "webstaurant logo" },
  { image: "/img/users/gokiwi.svg", imageDesc: "GoKiwi logo" },
  { image: "/img/users/outplay.svg", imageDesc: "outplay logo" },
  { image: "/img/users/tuneai.svg", imageDesc: "tune logo" },
  { image: "/img/users/wombo.svg", imageDesc: "wombo logo" },


];

export const TrustedByTeams = () => {
  return (
    <section className={`${styles.used_by} !mx-auto !w-[80vw] border border-signoz_slate-400 border-dashed !border-b-0 !m-0`}>
      <div className="section-container">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="text-signoz_vanilla-400 text-sm font-semibold leading-5 tracking-[0.05em] uppercase">Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span></div>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 mb-8 ">
          {COMPANIES.map((company, idx) => (
            <li key={`${idx}-${company.image}`} className="flex justify-center items-center">
              <img src={company.image} alt={company.imageDesc} />
            </li>
          ))}
        </ul>
        <div
          className={`wavy-line relative mb-16 mx-[-1rem]
        after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
      `}
        >
          <div className="flex flex-col items-center mb-5 text-center">
            <Link href="/case-study/" className="mx-2 bg-signoz_ink-500 z-[1]">
              <Button
                id="btn-get-started-website-navbar"
                className=" z-[1] relative button-background h-8 pr-3 pl-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 not-italic truncate text-center font-medium leading-5 text-white no-underline outline-none hover:text-white"
              >
                Read customer stories <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};
