import React from "react";
import styles from "./styles.module.css";
import Heading from "../../components/ui/Heading";
import { Button} from '@headlessui/react'
import { ArrowRight } from 'lucide-react'
import Link from "next/link";

const COMPANIES = [
  { image: "/img/users/super.svg", imageDesc: "super logo" },
  { image: "/img/users/hashnode.svg", imageDesc: "hashnode logo" },
  { image: "/img/users/zapier.svg", imageDesc: "zapier logo" },
  { image: "/img/users/incident_io.svg", imageDesc: "incident.io logo" },
  { image: "/img/users/mintlify.svg", imageDesc: "mintlify logo" },


];

export const TrustedByTeams = () => {
  return (
    <section className={styles.used_by}>
      <div className="container border border-signoz_slate-400 border-dashed">
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
          className={`wavy-line relative mb-16
        after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
      `}
        > 
        <div className="flex flex-col items-center mb-5 text-center">
          <Link href="/case-study/" className="mx-2">
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
