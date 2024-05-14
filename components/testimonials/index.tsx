import React from "react";
import Heading from "../../components/ui/Heading";

export const Testimonials = () => {
  const TESTIMONIALS_LIST = [
    [
      {
        name: "Aditya Tripathi",
        avatar: "img/users/aditya-tripathi.webp",
        designation: "Founder & CEO at Climactic",
        review: (
          <>
            <p>
              It was a breeze working with SigNoz! The team has also been very
              helpful. Good product!.{" "}
            </p>
          </>
        ),
        social: <LinkedIn />,
        href: "https://www.linkedin.com/feed/update/urn:li:activity:6979486051165761536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6979486051165761536%2C6981714434373107712%29",
      },
      {
        name: "Aloysius Coelho",
        avatar: "img/users/aloysius.webp",
        designation: "IT Infrastructure Engineer",
        review: (
          <>
            <p>SigNoz - Serious consideration over Grafana and WatchDog. </p>
          </>
        ),
        social: <LinkedIn />,
        href: "https://www.linkedin.com/posts/aloysius-coelho-%E2%98%81%EF%B8%8F-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-bb1a741b_the-genesis-of-signoz-a-full-stack-open-activity-6798498123242205184-ZEgs",
      },
      {
        name: "Pawan Bhadauria",
        avatar: "img/users/pawan-outplay.webp",
        designation: "VP - Engineering, Outplay",
        review: (
          <>
            <p>
              We are using Signoz at Outplay & our experience has been great. It
              has 5.4k stars on Github.
            </p>
          </>
        ),
        social: <LinkedIn />,
        href: "https://www.linkedin.com/posts/pawan-bhadauria-25980b7_seed-to-scale-podcast-series-by-accel-insights-activity-6877448856892768256-Fapw",
      },
    ],
    [
      {
        name: "Anselm Eickhoff",
        avatar: "img/users/anselm.jpg",
        designation: "Software Architect",
        review: (
          <>
            <p>
              NewRelic: receiving OpenTelemetry at all takes me 1/2 day to grok,
              docs are a mess. Traces show up after 5min. I burn the free
              100GB/mo in 1 day of light testing. @SignozHQ: can run it locally
              (∞GB), has a special tutorial for OpenTelemetry + Rust! Traces
              show up immediately.{" "}
            </p>
          </>
        ),
        social: <Twitter />,
        href: "https://twitter.com/ae_play/status/1572993932094472195?s=20&t=LWWrW5EP_k5q6_mwbFN4jQ",
      },
      {
        name: "Rachid Zarouali",
        avatar: "img/users/rachid.webp",
        designation: "Docker Captain, Microsoft Azure MVP",
        review: (
          <>
            <p>
              A new and yet powerful #observability #opensource alternative has
              born in the name of SigNoz. It could offer a serious challenger to
              Datadog / New Relic and other SaaS solutions.
            </p>
          </>
        ),
        social: <LinkedIn />,
        href: "https://www.linkedin.com/posts/rachidzarouali_signozsignoz-activity-6798537979452239872--zSJ",
      },
    ],
    [
      {
        name: "Apoorva Kumar",
        avatar: "img/users/apoorva-kumar.webp",
        designation: "Lead Backend Infra Eng, NuCash",
        review: (
          <>
            <p>
              Just deployed SigNoz to an EKS cluster.Still can't believe this is
              free, everything works like a charm. I am really really impressed
              with the documentation and dashboard.
              <br />
              <br />
              Still in awe. Sneak peek into running the product, you can easily
              set retention period for metrics, traces and logs with one click
              and set cold storage for old logs to s3 with few config changes.
            </p>
          </>
        ),
        social: <LinkedIn />,
        href: "https://www.linkedin.com/posts/apoorva-kumar_its-0319-am-ist-just-deployed-signoz-activity-6988981099896967168-c7yf",
      },
      {
        name: "Faris Hassan",
        avatar: "img/users/faris.jpeg",
        designation: "Lead Data Scientist",
        review: (
          <>
            <p>
              What's better than #datadog? Open source! I know @SignozHQ what
              else out there? #opensource{" "}
            </p>
          </>
        ),
        social: <Twitter />,
        href: "https://twitter.com/Iamfarisology/status/1553787074339381249",
      },
    ],
  ];
  return (
    <section>
      <div className="container my-8">
        <div className="flex flex-col items-center mb-5 text-center">
          <Heading type={4}>TESTIMONIALS</Heading>
          <Heading type={1}>
            We love what people are saying about SigNoz
          </Heading>
        </div>

        <div className="row">
          {TESTIMONIALS_LIST.map((column, idx) => (
            <div key={idx} className="col col--4">
              {column.map((testimonial, i) => (
                <div className="row" key={`${idx}-${i}`}>
                  <div className="card-demo m-2 w-full">
                    <div className="card">
                      <div className="card__header">
                        <div className="avatar">
                          <img
                            className="avatar__photo"
                            src={testimonial.avatar}
                            alt={`Profile of ${testimonial.name}`}
                          />
                          <div className="avatar__intro">
                            <h4 className="avatar__name mb-0">
                              {testimonial.name}
                            </h4>
                            <small className="avatar__subtitle">
                              {testimonial.designation}
                            </small>
                          </div>

                          <a
                            className="platform-icon linkedin"
                            href={testimonial.href}
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >
                            {testimonial.social}
                          </a>
                        </div>
                      </div>

                      <div className="card__body padding--md">
                        {testimonial.review}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LinkedIn = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4482 20.4487H16.8921V14.8796C16.8921 13.5516 16.8684 11.8421 15.0426 11.8421C13.1905 11.8421 12.9071 13.289 12.9071 14.7829V20.4483H9.35106V8.99608H12.7649V10.5612H12.8127C13.5088 9.37094 14.8031 8.66008 16.1809 8.71122C19.7851 8.71122 20.4496 11.082 20.4496 14.1662L20.4482 20.4487ZM5.33865 7.43065C4.19895 7.43085 3.27487 6.50708 3.27466 5.36735C3.27446 4.22762 4.19821 3.30352 5.33791 3.30332C6.47762 3.30311 7.4017 4.22688 7.4019 5.36661C7.402 5.91393 7.18468 6.43887 6.79775 6.82595C6.41081 7.21303 5.88596 7.43055 5.33865 7.43065ZM7.11668 20.4487H3.55693V8.99608H7.11668V20.4487ZM22.221 0.000935081H1.77001C0.803454 -0.00997274 0.0108197 0.764276 -0.000976562 1.73084V22.2671C0.0104158 23.2341 0.802986 24.0092 1.77001 23.999H22.221C23.1899 24.011 23.9856 23.236 23.999 22.2671V1.72936C23.9852 0.760885 23.1895 -0.0133197 22.221 -0.000702441"
        fill="#03A9F4"
      />
    </svg>
  );
};

const Twitter = () => {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.9985 2.78581C24.1166 3.17644 23.168 3.43709 22.1674 3.56041C23.1847 2.95646 23.9673 1.99321 24.3346 0.855304C23.3827 1.41326 22.3281 1.82322 21.2062 2.03921C20.3103 1.08928 19.0324 0.5 17.6165 0.5C14.8967 0.5 12.6922 2.68515 12.6922 5.37959C12.6922 5.7609 12.7369 6.1322 12.8209 6.49283C8.72922 6.28752 5.10019 4.34235 2.6724 1.39059C2.24576 2.11187 2.00578 2.95646 2.00578 3.84772C2.00578 5.54158 2.87305 7.03279 4.1956 7.91138C3.38834 7.88672 2.6284 7.66207 1.96312 7.3021C1.96312 7.31677 1.96312 7.33876 1.96312 7.35943C1.96312 9.72657 3.66098 11.6977 5.91146 12.1464C5.50016 12.259 5.06553 12.3217 4.61757 12.3217C4.29959 12.3217 3.98962 12.2857 3.68964 12.2317C4.31626 14.1662 6.13411 15.5801 8.28793 15.6221C6.60273 16.9286 4.48024 17.7112 2.17244 17.7112C1.7738 17.7112 1.38384 17.6886 0.998535 17.6419C3.17902 19.0225 5.76814 19.8317 8.54724 19.8317C17.6032 19.8317 22.5574 12.395 22.5574 5.94355C22.5574 5.73223 22.5507 5.52158 22.5407 5.3136C23.5073 4.63099 24.3406 3.76973 24.9985 2.78581Z"
        fill="#03A9F4"
      />
    </svg>
  );
};
