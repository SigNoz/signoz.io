import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About us - SigNoz',
  description: 'Learn about SigNoz, our mission, vision, and the principles that guide us.',
}

function aboutus() {
  return (
    <div title="About Us">
      <section>
        <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          {/* Introduction */}
          <h1 className="text--center margin-vert--lg">About SigNoz</h1>
          <p className="text--center margin-vert--lg">
            SigNoz was created with a simple yet powerful purpose: to bring clarity and insight to developers and DevOps engineers
            through effective observability tools. Observability, at its core, is about understanding the inner workings of a
            system, and our mission is to provide this understanding in a way that cuts through complexity and noise.
          </p>

          {/* Mission Section */}
          <div className="mission-section" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower engineering teams with robust, user-friendly observability tools that allow them to
              diagnose and solve performance issues quickly and effectively. We envision a future where every organization can
              achieve seamless observability across distributed systems without needing to rely on costly, complex setups.
            </p>
          </div>

          {/* Vision Section */}
          <div className="vision-section" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Our Vision</h2>
            <p>
              We believe that observability should be an accessible, integral part of the software development process.
              As software systems grow more intricate, gaining visibility into these systems shouldn’t become a daunting or expensive task.
              Our vision is to build an ecosystem where engineering teams of all sizes can gain immediate, actionable insights into
              their applications’ health and performance, fostering a world where software reliability is prioritized and achievable.
            </p>
          </div>

          {/* Core Values Section */}
          <div className="values-section" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Core Values</h2>
            <ul style={{ listStyleType: 'circle', textAlign: 'left', display: 'inline-block', maxWidth: '600px', margin: '0 auto' }}>
              <li><strong>Transparency:</strong> We embrace open-source values and prioritize transparent communication, both internally and with our community.</li>
              <li><strong>Continuous Improvement:</strong> Innovation is in our DNA. We believe in iterating, learning, and improving every aspect of our product and processes.</li>
              <li><strong>Empathy:</strong> Understanding our users’ needs and challenges is at the heart of our approach. We design tools that are intuitive, powerful, and tailored to real-world use cases.</li>
              <li><strong>Community-Driven Development:</strong> We view our community as partners in development, incorporating feedback and evolving our platform in response to real-world needs.</li>
              <li><strong>Reliability:</strong> We are dedicated to providing tools that developers and DevOps engineers can trust. Reliability is not just a feature; it’s our commitment.</li>
            </ul>
          </div>

          {/* Why SigNoz Section */}
          <div className="why-signoz" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Why SigNoz?</h2>
            <p>
              SigNoz was built from the ground up to address gaps in existing observability solutions. With many monitoring tools being
              prohibitively expensive or overly complex, we set out to create a solution that is both cost-effective and easy to use, without
              sacrificing powerful insights. SigNoz is open-source, giving users the flexibility to deploy it on their own infrastructure while
              benefitting from a community-driven ecosystem. We aim to create a streamlined experience that allows engineering teams to monitor,
              troubleshoot, and optimize their applications with minimal setup and maximum impact.
            </p>
          </div>

          {/* Getting Involved */}
          <div className="get-involved" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Getting Involved</h2>
            <p>
              As an open-source project, we welcome contributions from developers and observability enthusiasts worldwide. Whether it’s contributing
              code, sharing insights, or joining discussions, there are many ways to get involved and help us make SigNoz even better. 
              We believe that community collaboration is the key to innovation, and we’re excited to build the future of observability together.
            </p>
            <Link href="/community" className="button button--secondary button--outline">
              Join Our Community
            </Link>
          </div>

          {/* Contact Section */}
          <div className="contact-section" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <h2>Contact Us</h2>
            <p>
              We love hearing from users, contributors, and fellow engineers passionate about observability. Feel free to reach out
              with questions, ideas, or feedback. Together, we can build a better experience for engineering teams everywhere.
            </p>
            <p>
              <a href="mailto:contact@signoz.io" style={{ color: 'blue', textDecoration: 'underline' }}>contact@signoz.io</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default aboutus
