---
id: sso-authentication
title: Single Sign-on Authentication
sidebar_label: SSO & SAML
---

Single Sign-on Settings can be configured through `Settings > Organization Settings > Authenticated Domains (section)`. You can use SSO settings to let your team log in through an Identity Providers (like Google Workspace, Okta, etc) instead of using passwords.  

## Google Workspace
Google Workspace single sign-on (SSO) provides password-free access to the invited members of your workspace to SigNoz.  

#### Who can use this feature?
- Google Workspace Owners and Org Owners
- Available in `ENTERPRISE` plan. 

#### Steps to configure Google OAuth 2.0
Google Workspace single sign-on (SSO) lets all members of your workspace sign in to SigNoz using their Google accounts. If they don’t have a account in SigNoz yet, they will have to be invited by Admin from `Settings > Organization Settings > Invite Members`.

1. Register your signoz instance with your Google org by visiting the [cloud console](https://console.cloud.google.com/apis/credentials). You must [create a developers project](https://redash.io/help/open-source/admin-guide/google-developer-account-setup) if you have not already. Then follow the Create Credentials flow.

2. Set the Authorized Redirect URL(s) to http(s)://${SIGNOZ_BASEURL}/api/v1/complete/google

3. During the setup you will obtain a client id and a client secret. Note it down as you will need them while setting up google auth in SigNoz.

4. Go to `Settings > Organization Settings > Authenticated Domains`. Click `Add a Domain`. Enter your domain name (e.g. user@your-email-domain.com). 

5. After domain is created, click on `Configure SSO`. Choose `Google Authentication` from the list. 

6. Now, enter the client id and secret you obtained in step 3. Click `Save Settings`. 

7. Click on `Enforce SSO` (next to your domain in Authenticated Domains) to enable google SSO login. When you enforce SSO, all users with user name format `<username>@your-email-domain.com`  will be forced to log in through Google. 

8. To test your setup, we recommend you to log in from a new browser window in Incognito mode. 

9. If you face issue signining in, review the query service logs. To log into SigNoz for correcting SSO settings, admins may use this special URL to use password based login: http(s)://${SIGNOZ_BASEURL}/login?password=Y


## SAML based Authentication
Integrating SAML with SigNoz lets your users access SigNoz without re-authenticating. Configuring SAML is a two step process. First, you would have to configure your IdP (Identity Provider like Okta, Azure AD) with details of your SigNoz app. When the first step is complete, you would need to enter the information (like Entity ID, etc) available in your IdP into SigNoz settings (`Settings >> Organization Settings >> Authentication Domains`)

#### Who can use this feature?
- Available in `ENTERPRISE` plan. 

#### SAML authentication with Azure AD (Active Directory)
##### Steps to be performed in Azure AD
1. Go to the `Azure Active Directory (AD)`  and click on `Enterprise Applications`. 
2. Click on `+ New Application` in the top bar of the *All Applications* page.
3. In the next page, click on `+Create your own application`. Enter your application name as *SigNoz*, Select **Integrate with other Applications (Non-Gallery)** option and create.
4. Once the application is created, go to `Single Sign-On` from left side bar and click on `SAML` card option
5. When the next page appears, you will see an card for `Basic SAML Configuration`. Click on edit icon button in this card 
6. Fill out the following details and click `Save`:
    - Entity Identifier (Entity ID): Set Base URL (host and port - if any) of your SigNoz app. e.g. http(s)://${SIGNOZ_BASEURL}
    - Reply URL(Assertion Consumer Service URL): Set the reply URL using this format - http(s)://${SIGNOZ_BASEURL}/api/v1/complete/saml
7. Now we need to capture SSO information required to configure SAML in SigNoz. In the page, locate *App Federation Metadata URL*. Preferably, open this metadata page in a new tab. Once there, locate and copy these two field values from XML into a separate notepad: 
    - At the top of page, locate XML tag `EntityDescriptor` and copy the `entityID` value 
    ```
        <EntityDescriptor ID="_2d8d...a006" entityID="https://sts.windows.net/00d562...816c79/" xmlns="urn:oasis:names:tc:SAML:2.0:metadata">
    ```
    - Locate `X509Data` tag and copy the entity content (value). This is certificate that SigNoz needs to validate response from IdP.
    - Locate `Location` at the bottom of the page and copy its value. 

For more details on the metadata page, click [here](https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/active-directory/azuread-dev/azure-ad-federation-metadata.md)

##### Steps to be performed in SigNoz
1. Go to `Settings`. Click on `Organization Settings` tab and locate `Authenticated Domains` in the page
2. Click `Add Domain`
3. Enter the domain that your users would login with. For example, if your user names or emails are in format such as *john@example.com* then you would have to enter *example.com* here.
4. After domain is added, Click on `Configure SSO` and choose `SAML Authentication` option
5. Enter values of tags `entity ID`, `Certificate Data` and `Location(ACS URL)` that you acquired from the metadata page (step 7 above)
6. Save the settings and log in from an incognito tab to test the setup. If you face difficulties signing in, review the query service logs. Also if you are admin and are unable to login because of faulty setup, then you may login with password using this URL: http(s)://${SIGNOZ_BASEURL}/login?password=Y

