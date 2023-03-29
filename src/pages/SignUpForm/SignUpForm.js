import React from 'react'
import styles from './SignUpForm.module.css'

const SignUpForm = () => {
  return (
    <>
      <div className='blue-headind'></div>
      <main>
      <div class='main-discrible'>
            <h1>SigNoz <span class="orange">Enterprise</span></h1>
            <ul>
                <li>- Managed Self-Hosted SigNoz in your
                    premise or cloud</li>
                <li>- Single Sign-On </li>
                <li>- SAML and LDAP support</li>
                <li>- AWS Private Link</li>
                <li>- Support for Dashboard configuration
                    from expert engineers</li>
                <li>- Support plan with SLAs</li>
            </ul>
        </div>
        <div class='main-form'>
            
            <h2 class="bold">Get more info on SigNoz Enterprise</h2>
            <div class="input-container">
                <input  type="email" placeholder="Email*"/>
                <input  type="text" placeholder="Name"/>
                <input  type="text" placeholder="Company"/>
                <input class='input-orange' type="submit" value="Submit"/>
            </div>
               
            
        </div>
      </main>
    </>
  )
}

export default SignUpForm