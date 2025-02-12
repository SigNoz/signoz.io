import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Reference',
}

const markdownContent = `**TERMS OF REFERENCE**

These Terms of Reference provide the definition of words used in capitalized manner in the Terms and Conditions available at [https://signoz.io/terms-of-service/](https://signoz.io/terms-of-service/) and Privacy Policy [https://signoz.io/privacy/](https://signoz.io/privacy/) .

1) “SaaS Platform” means the open-source observability tool used for monitoring and troubleshooting applications, enabling users to gain insights and enhance performance which is accessible by the Customer through an individually assigned URL;  
     
2) “User” means any authorized user designated by the Customer to use the SaaS Platform and whose Personal Data is being processed by Signoz under the Privacy Policy available at [https://signoz.io/privacy/](https://signoz.io/privacy/) upon the instructions of the Customer;  
     
3) “Processing” or “Process” means any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.  
     
4) “Personal Data” means any data about an individual who is identifiable by or in relation to such data and shall also include customer personal data or other similar term as applicable in the context of the Customer or its User or Personal data Contained in Customer Content.   
     
5) “Applicable Data Protection Laws” refers to all applicable laws, regulations, directives, and rules concerning the protection of Personal Data, privacy, and the processing of personal data that govern the Parties. This includes any relevant laws, regulations, or standards that regulate the collection, use, disclosure, or security of Personal Data, including those at national regional, state, or sector-specific levels.   
     
6) Subprocessor means any entity engaged and authorized by Signoz for Processing of Personal Data.  
     
7) “Security Incident” means any confirmed unauthorized or unlawful breach of security that leads to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of or access to Personal Data being Processed by Signoz. Security Incidents do not include unsuccessful attempts or activities that do not compromise the security of Personal Data, including unsuccessful log-in attempts, pings, port scans, denial of service attacks or other network attacks on firewalls or networked systems.  
     
8) “Data Fiduciary” or “Data Controller” means any entity which alone or in conjunction with another entity determines the purpose and means of processing Personal Data.   
     
9) “Processor” or “Data Processor” means any entity which is engaged in Processing of Personal Data. For the purpose of the Privacy Policy [https://signoz.io/privacy/](https://signoz.io/privacy/) , Signoz shall be the Data Processor.

10) “EEA SCCs” means the standard contractual clauses annexed to the European Commission's Implementing Decision 2021/914 of 4 June 2021 on standard contractual clauses for the transfer of personal data to third countries pursuant to Regulation (EU) 2016/679 of the European Parliament and of the European Council.  
      
11) “European Economic Area” or “EEA” means the member states of the European Union, Norway, Iceland, and Liechtenstein.  
      
12) “GDPR” means European Union Regulation 2016/679 as implemented by local law in the relevant EEA member nation.  
      
13) “Confidential Information” means the term as ascribed in Clause 5 (a) of the Terms and Conditions available at [https://signoz.io/terms-of-service/](https://signoz.io/terms-of-service/).  
      
14) “Intellectual Property Rights” means any and all intellectual property rights existing from time to time under any law, including patent law, copyright law, semiconductor chip protection law, moral rights law, trade secret law, trademark law (together with all of the goodwill associated therewith), unfair competition law, publicity rights law, or privacy rights law, and any and all other proprietary rights, and any and all applications, renewals, extensions and restorations of any of the foregoing, now or hereafter in force and effect worldwide. For purposes of this definition, rights under patent law shall include rights under any and all patent applications and patents (including letters patent and inventor’s certificates) anywhere in the world, including any provisionals, substitutions, extensions, supplementary patent certificates, reissues, renewals, divisions, continuations in part (or in whole), continued prosecution applications, requests for continued examination, and other similar filings or stages thereof provided for under the laws of the United States of America;  
      
15) “Service(s)” shall have the same meaning as ascribed in Clause 1 (a) of the Terms and Conditions available at [https://signoz.io/terms-of-service/](https://signoz.io/terms-of-service/) and Clause 1 of the Privacy Policy \[Insert link of the updated version of Privacy Policy\]:

16) “Term” shall have the same meaning as ascribed in Clause 9 (a) of the Terms and Conditions available at [https://signoz.io/terms-of-service/](https://signoz.io/terms-of-service/) and Clause 14 (a) of the Privacy Policy [https://signoz.io/privacy](https://signoz.io/privacy) :  
      
17) “Feedback” means suggestions, feedback, or comments about the SaaS Platform or related Services  
      
18) “Customer Content” means data, information, or materials submitted by or on behalf of Customer or Users to the Website or SaaS Platform but excludes Feedback.  
      
19) “Beta Product” means an early or prerelease feature or version of the SaaS Platform that is identified as beta or similar, or a version of the SaaS Platform that is not generally available.  
      
20) “Usage Data” means data and information about the provision, use, and performance of the SaaS Platform and related offerings based on Customer’s or User’s use of the SaaS Platform.   `

export default function termsReferencePage() {
  return (
    <div className="terms-of-reference container mx-auto my-16">
      <MarkdownRenderer markdownContent={markdownContent} />
    </div>
  )
}
