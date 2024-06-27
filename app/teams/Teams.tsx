'use client'

import React from 'react'
import styles from './styles.module.css'
import { DiscussYourProject } from '@/components/DiscussYourProject'
import SignozCloudSignUpForm from '@/components/SignozCloudSignupForm'

const TEAMS_DATA = {
  TITLE: 'SigNoz Cloud is the easiest way of running SigNoz',
  DESC: 'Experience SigNoz effortlessly. No installation, maintenance, or scaling needed. Get started now with a free trial account for 30 days.',
  PORTAL_ID: '22308423',
  FORM_ID: '56f370ae-d84e-49b6-8629-134dbb74d90a ',
  FEATURE_POINTS: [
    {
      title: 'Try it free for 30 days',
      desc: 'Get logs, metrics, and traces under a single pane of glass. No need for disparate tooling with too much operational overhead.',
      imageUrl: '/svgs/icons/metrics-traces-and-logs-light.svg',
    },
    {
      title: 'Trusted by industry leaders',
      desc: 'Teams at NetApp, ClearTax and other industry leaders have trusted SigNoz to run their observability stack.',
      imageUrl: '/svgs/icons/trusted-by-industry-light.svg',
    },
    {
      title: 'OpenTelemetry-Native',
      desc: 'Future-proof your observability with OpenTelemetry. Second most active CNCF project after Kubernetes, OpenTelemetry is the future of cloud-native application monitoring.',
      imageUrl: '/svgs/icons/open-telemetry-native-light.svg',
    },
    {
      title: 'Data Residency',
      desc: 'Worried about data privacy and regulation laws? We have data centers in EU, US and India region to  help you comply with data privacy regulation.',
      imageUrl: '/svgs/icons/your-data-in-your-boundary-light.svg',
    },
  ],
}

function Teams() {
  return (
    // <div className="" title="Teams">
    //   <section className={styles.team}>
    //     <DiscussYourProject title={TEAMS_DATA.TITLE} desc={TEAMS_DATA.DESC} />
    //     <div className={styles.teamSection}>
    //       <div className={`container ${styles.teamContainer}`}>
    //         <div className={`row ${styles.teamRow}`}>
    //           <div className={'col col--6 margin-vert--md'}>
    //             <div className={styles.featuresContainer}>
    //               {TEAMS_DATA.FEATURE_POINTS.map((feature, idx) => (
    //                 <div key={idx} className={styles.featureWrapper}>
    //                   <img
    //                     className={styles.featureImage}
    //                     src={feature.imageUrl}
    //                     alt={feature.title}
    //                   />
    //                   <div className={styles.featureContent}>
    //                     <h3 className={styles.featureTitle}>{feature.title}</h3>
    //                     <p className={styles.featureDesc}>{feature.desc}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //           <div className={'col col--6 margin-vert--md'}>
    //             <div className={`card ${styles.teamCard}`}>
    //               <div className="card__body">
    //                 <SignozCloudSignUpForm />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>

    // <div className='flex mt-32' style={{border: "2px solid red"}}>
    //   <div className='pl-40 w-7/12'>
    //     <SignozCloudSignUpForm/>
    //   </div>
    //   <div className='' style={{border: "2px solid red", padding: "67px", width: "466px", height: "344px"}}>
        
    //   </div>
    // </div>
    <div className='flex flex-col md:flex-row mt-32 px-20 md:flex-row'>
      <div className='flex-[3_3_0%]' style={{paddingLeft: '36px', paddingRight: '156px'}}> <SignozCloudSignUpForm /> </div>
      <div className='flex-[2_2_0%]'>
        <div className='flex flex-col gap-12 py-20 px-16'>
          <img src="/img/users/incident_io.svg" alt="incident.io logo"  style={{width: '112px', height: '28px'}}/>
          <span className=''>SigNoz balances flexibility and security extremely well. They've built clean and thoughtful abstractions over advanced security foundations, and the product just works. We barely have to think about it.</span>
          <div className='flex flex-col gap-2'>
            <span className=''>Mike Hudak</span>
            <span className=''>CTO - incident.io</span>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Teams

  // < div className = "" >
  //         <img src="/img/users/incident_io.svg" alt="incident.io logo" />
  //         <p className='text-signoz_sienna-200 text-2xl font-normal leading-10 text-eenter'>SigNoz balances flexibility and security extremely well. They've built clean and thoughtful abstractions over advanced security foundations, and the product just works. We barely have to think about it.</p>
  //         <div className='flex flex-col gap-2'>
  //           <p className='m-0 text-signoz_sienna-200 text-xl font-medium text-center'>Mike Hudak</p>
  //           <p className='m-0 text-signoz_sienna-200 text-base font-normal text-center'>CTO - incident.io</p>
  //         </div>
  //       </div >