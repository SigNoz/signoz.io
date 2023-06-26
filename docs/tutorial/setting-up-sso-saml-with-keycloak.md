---
id: setting-up-sso-saml-with-keycloak
title: Setting Up SSO SAML 2.0 With Keycloak
description: Setting Up Single Sign-On (SSO) SAML 2.0 With Keycloak.
---

:::info
SAML-based authentication is only available on Enterprise plans
(both self-hosted and on SigNoz Cloud).
:::

### Overview

Keycloak is an open-source identity and access management tool which makes
it easy to add authentication to applications and secure with minimum effort.

In enterprise plan of SigNoz, you can enforce Single Sign-On (SSO) using SAML 2.0.
Keycloak can be used as a user directory to save user data while acting as the
identity provider (IdP) for the SSO.

### Prerequisites

- SigNoz application up and running
- Helm version 3.8 or above
- SigNoz helm chart version 0.4.3 or above
- Enterprise plan of SigNoz
- Set up `cert-manager` and Nginx ingress controller
- SigNoz Frontend ingress with TLS

:::info
If you have not set up `cert-manager`, Nginx ingress controller, or
have Signoz with TLS, you can follow the guide [here][1] to set it up.
:::

## Set up Single Sign-On using SAML

For this tutorial, you will be required to have Keycloak up and running.

It is assumed that you have set up Keycloak or any other identity and
access management tool with SSL/TLS certificates.

In case you do not have Keycloak set up and want to install Keycloak
using SigNoz chart, you can follow the [instructions in this section][2]
before proceeding further.

### Steps to Set Up SAML

Let's assume `https://signoz.domain.com` as the endpoint where SigNoz is
publicly accessible whereas `https://signoz-keycloak.domain.com` being
the secured endpoint of **Keycloak**.

1. Go to the Keycloak Admin console UI and sign in as an administrator

  ![Admin login page](/img/docs/keycloak-saml/admin-login.png)

2. Create a new realm: **SigNoz**

  ![Create SigNoz realm](/img/docs/keycloak-saml/create-realm.png)

3. Create new client of type **SAML** with client ID same as that of
  secured SigNoz endpoint: `signoz.domain.com`

  ![Create client page](/img/docs/keycloak-saml/create-client.png)

4. Update **Access settings** configurations

   - Set **Home URL** to `https://signoz.domain.com/api/v1/complete/saml`
   - Set **Valid redirect URIs** to `https://signoz.domain.com/*`

  ![Client access settings](/img/docs/keycloak-saml/client-access-settings.png)

5. Go to Clients > Client scopes, and select `signoz.domain.com-dedicated` and
  add predefined mappers in SigNoz client: *role list*, *X500 email*, and *X500 given name* 

  ![Predefined mappers](/img/docs/keycloak-saml/add-predefined-mappers.png)

6. In SAML capabilities section, select **email** for Name ID format

  ![SAML capabilities email id](/img/docs/keycloak-saml/saml-capabilities-email-id.png)

7. Go to Clients > Keys, and turn off the **Client signature required** option
  from signing keys config

  ![Client signature required](/img/docs/keycloak-saml/client-signature-required.png)

8. Create new user which is to be used for login. Be sure to include
  email id in **username** and **email** fields

  ![Create new user](/img/docs/keycloak-saml/create-user.png)

9. Make sure to create credentials for the created user and turn off the temporary toggle

  ![New user credentials](/img/docs/keycloak-saml/new-user-credentials.png)

10. Go to Realm settings > General, open **SAML 2.0 Identity Provider Metadata** endpoint

  ![SAML 2.0 identity provider metadata](/img/docs/keycloak-saml/realm-setting-saml.png)

  From the XML file, make note of the followings:
   - SAML location URL with the `/protocol/saml` suffix which is SAML ACS URL
   - SAML entity id
   - SAML X.509 certificate

11. In SigNoz UI, go to Settings > Organization Settings > Authenticated Domains

    Add an authenticated domains which will be the domain of the user email;
    in case of `prashant@domain.com`, it will be `domain.com`.

  ![Add authenticated domain](/img/docs/keycloak-saml/add-domain.png)

12. SAML configurations from **Step 10** is set in SigNoz and enable the
  **Enforce SSO** toggle

  ![SigNoz SAML configuration](/img/docs/keycloak-saml/signoz-saml-configuration.png)

13. Open your browser with incognito (or private) mode, and open your SigNoz
  URL and click **Login** followed by **SSO Login**

  ![SSO Login](/img/docs/keycloak-saml/sso-login.png)

14. You will be redirected to Keycloak user login page, enter Keycloak user
  credentials from **Step 8** and **Step 9**

  ![Keycloak user login](/img/docs/keycloak-saml/keycloak-user-login.png)

Now, you should be logged in to SigNoz using Keycloak SSO.

### (Optional) Install Keycloak using SigNoz Helm Chart

You can install the **Keycloak** using SigNoz helm chart. We can set custom
namespace, admin console credentials, postgres admin and user credentials,
and ingress related configurations.

Let's include them in existing `override-values.yaml`:

```yaml
keycloak:
  enabled: true

  auth:
    adminUser: admin
    adminPassword: adminpass123

  postgresql:
    auth:
      postgresPassword: pgadminpass123
      username: bn_keycloak
      password: bn_keycloak123

  ingress:
    enabled: true
    ingressClassName: nginx
    pathType: ImplementationSpecific
    path: /
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
    hostname: signoz-keycloak.domain.com
    servicePort: http

    tls: true
    selfSigned: false
```

:::info
You will need to replace `domain.com` with company domain or something relevant.

Make sure that you have Nginx ingress controller and Cert-manager installed
and you have a `ClusterIssuer` named `letsencrypt-prod`.
You can follow the instructions from the [guide here][1].
:::

To install or upgrade SigNoz release with the updated configurations in
`override-values.yaml`:

```bash
helm -n platform upgrade \
    --create-namespace --install \
    my-release signoz/signoz \
    -f override-values.yaml
```

You should be able to access Keycloak UI using the domain name in `ingress.hostname`.

---

[1]: /docs/tutorial/setting-up-tls-for-signoz
[2]: /docs/tutorial/setting-up-sso-saml-with-keycloak/#optional-install-keycloak-using-signoz-helm-chart
