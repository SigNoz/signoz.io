const docsSideNav = [
  {
    type: 'doc',
    label: 'Get Started',
    route: '/docs',
  },
  {
    type: 'category',
    isExpanded: false,
    label: 'Overview',
    items: [
      {
        type: 'doc',
        label: 'What is SigNoz?',
        route: '/docs/what-is-signoz',
      },
      {
        label: 'SigNoz Features',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/product-features/query-builder',
            label: 'Query Builder',
          },
          {
            type: 'doc',
            route: '/docs/product-features/alert-management',
            label: 'Alert Management',
          },
          {
            type: 'doc',
            route: '/docs/product-features/trace-explorer',
            label: 'Trace Explorer',
          },
          {
            type: 'doc',
            route: '/docs/product-features/logs-explorer',
            label: 'Logs Explorer',
          },
          {
            type: 'doc',
            route: '/docs/product-features/saved-view',
            label: 'Saved View',
          },
          {
            type: 'doc',
            route: '/docs/product-features/invite-team-member',
            label: 'Invite Team Member',
          },
          {
            type: 'doc',
            route: '/docs/product-features/keyboard-shortcuts',
            label: 'Keyboard Shortcuts',
          },
        ],
      },
      {
        type: 'doc',
        label: "What's Coming",
        route: '/docs/roadmap',
      },
      {
        type: 'category',
        label: 'Core Concepts',
        route: '/docs/overview/core-concepts/overview',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            label: 'Architecture',
            route: '/docs/architecture',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    isExpanded: false,
    label: 'Setup',
    route: '/docs/install/',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'SigNoz Cloud',
        route: '/docs/cloud',
        items: [
          {
            type: 'doc',
            route: '/docs/cloud/quickstart',
            label: 'Quickstart',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Self-Host SigNoz',
        route: '/docs/install/self-host',
        items: [
          {
            type: 'category',
            isExpanded: false,
            label: 'Install on Docker',
            items: [
              {
                type: 'doc',
                label: 'Docker Standalone',
                route: '/docs/install/docker',
              },
              {
                type: 'doc',
                label: 'Docker Swarm',
                route: '/docs/install/docker-swarm',
              },
              {
                type: 'doc',
                label: 'Docker SELinux',
                route: '/docs/install/docker-selinux',
              },
              {
                type: 'category',
                isExpanded: false,
                label: 'Troubleshooting',
                items: [
                  {
                    type: 'doc',
                    label: 'General FAQs',
                    route: '/docs/setup/docker/troubleshooting/faq',
                  },
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Install Binary',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                label: 'Linux',
                route: '/docs/install/linux',
              },
            ],
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Install on Kubernetes',
            route: '/docs/install/kubernetes',
            items: [
              {
                type: 'doc',
                label: 'Deploying to AWS',
                route: '/docs/install/kubernetes/aws',
              },
              {
                type: 'doc',
                label: 'Deploying to GCP',
                route: '/docs/install/kubernetes/gcp',
              },
              {
                type: 'doc',
                label: 'Deploying to AKS',
                route: '/docs/install/kubernetes/aks',
              },
              {
                type: 'doc',
                label: 'Deploying to OpenShift',
                route: '/docs/install/kubernetes/openshift',
              },
              {
                type: 'doc',
                label: 'Deploying to Digital Ocean',
                route: '/docs/install/digital-ocean',
              },
              {
                type: 'doc',
                label: 'Other Platform',
                route: '/docs/install/kubernetes/others',
              },
              {
                type: 'doc',
                label: 'Deploying to Local',
                route: '/docs/install/kubernetes/local',
              },
              {
                type: 'doc',
                label: 'Deploying with ArgoCD',
                route: '/docs/install/argocd',
              },
            ],
          },
          {
            type: 'doc',
            label: 'Deploying to ECS',
            route: '/docs/install/ecs',
          },
          {
            type: 'doc',
            label: 'Deploying to Azure Container Apps',
            route: '/docs/install/azure-container-apps',
          },
          {
            type: 'doc',
            isExpanded: false,
            label: 'Deploying from Marketplaces',
            route: '/docs/install/marketplaces',
          },
          {
            type: 'doc',
            route: '/docs/install/uninstall',
            label: 'Uninstall',
          },
          {
            type: 'category',
            label: 'Capacity Planning',
            isExpanded: false,
            items: [
              {
                type: 'category',
                label: 'Community',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    label: 'SigNoz Resources Planning',
                    route: '/docs/setup/capacity-planning/community/resources-planning',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    type: 'category',
    label: 'Manage',
    isExpanded: false,
    route: '/docs/manage/overview',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'Upgrade Guides',
        route: '/docs/operate/upgrade',
        items: [
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-standard',
            label: 'Upgrade Standard',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.94',
            label: 'Upgrade to v0.94',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.92',
            label: 'Upgrade to v0.92',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.88',
            label: 'Upgrade to v0.88',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.86',
            label: 'Upgrade to v0.86',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.76',
            label: 'Upgrade to v0.76',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.70',
            label: 'Upgrade to v0.70',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.64',
            label: 'Upgrade to v0.64',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.55',
            label: 'Upgrade to v0.55',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.51',
            label: 'Upgrade to v0.51',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.49',
            label: 'Upgrade to v0.49',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.45',
            label: 'Upgrade to v0.45',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.38',
            label: 'Upgrade to v0.38',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.36',
            label: 'Upgrade to v0.36',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.27',
            label: 'Upgrade to v0.27',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.23',
            label: 'Upgrade to v0.23',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.19',
            label: 'Upgrade to v0.19',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.12',
            label: 'Upgrade to v0.12',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.10',
            label: 'Upgrade to v0.10',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.9',
            label: 'Upgrade to v0.9',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.8.1',
            label: 'Upgrade to v0.8.1',
          },
          {
            type: 'doc',
            route: '/docs/operate/migration/upgrade-0.8.0',
            label: 'Upgrade to v0.8.0',
          },
        ],
      },
      {
        label: 'Administrator Guides',
        type: 'category',
        isExpanded: false,
        route: '/docs/manage/administrator-guide',
        items: [
          {
            type: 'category',
            isExpanded: false,
            label: 'ClickHouse',
            route: '/docs/operate/clickhouse',
            // link: {
            // type: 'generated-index',
            // title: 'ClickHouse',
            // description:
            // 'The following sections provide instructions to operate ClickHouse. Based on your environment, proceed to one of the sections below.',
            // slug: '/operate/clickhouse/clickhouse',
            // },
            items: [
              {
                type: 'category',
                route: '/docs/operate/clickhouse/distributed-clickhouse',
                label: 'Distributed ClickHouse',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route:
                      '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker',
                    label: 'Docker',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/docker-swarm',
                    label: 'Docker Swarm',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/manage/administrator-guide/clickhouse/distributed-clickhouse/kubernetes',
                    label: 'Kubernetes',
                  },
                ],
              },
              {
                type: 'doc',
                route: '/docs/operate/clickhouse/increase-clickhouse-pv',
                label: 'Increase ClickHouse PV',
              },
              {
                type: 'doc',
                route: '/docs/operate/clickhouse/connect-to-clickhouse',
                label: 'Connect to ClickHouse',
              },

              {
                type: 'doc',
                route: '/docs/operate/clickhouse/external-clickhouse',
                label: 'External ClickHouse',
              },
              {
                type: 'doc',
                route: '/docs/tutorial/writing-clickhouse-queries-in-dashboard',
                label: 'ClickHouse queries for building dashboards and alerts',
              },
            ],
          },
          {
            label: 'Security & Compliance',
            type: 'category',
            isExpanded: false,
            // route: '',
            items: [
              //     'userguide/overview',
              {
                type: 'doc',
                route: '/docs/userguide/authentication',
                label: 'Authentication',
              },
            ],
          },
          {
            type: 'category',
            label: 'Configuration',
            route: '/docs/operate/configuration',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/manage/administrator-guide/configuration/smtp-email-invitations',
                label: 'Enable SMTP for Email Invitations',
              },
              {
                type: 'doc',
                isExpanded: false,
                label: 'Alertmanager',
                route: '/docs/manage/administrator-guide/configuration/alertmanager',
              },
              {
                type: 'doc',
                route: '/docs/manage/administrator-guide/configuration/jwt-secret',
                label: 'JWT Secret',
                isExpanded: false,
              },
              {
                type: 'doc',
                route: '/docs/manage/administrator-guide/configuration/relational-database',
                label: 'Relational Databases Support',
                isExpanded: false,
              },
            ],
          },
          {
            type: 'category',
            label: 'SSO',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/manage/administrator-guide/sso/overview',
                label: 'Overview',
              },
              {
                type: 'category',
                label: 'User Guides',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route: '/docs/manage/administrator-guide/sso/user-guides/saml-jumpcloud',
                    label: 'JumpCloud - SAML Authentication',
                  },
                  {
                    type: 'doc',
                    route: '/docs/manage/administrator-guide/sso/user-guides/saml-awsso',
                    label: 'AWS SSO - SAML Authentication',
                  },
                  {
                    type: 'doc',
                    route: '/docs/manage/administrator-guide/sso/user-guides/saml-okta',
                    label: 'Okta - SAML Authentication',
                  },
                  {
                    type: 'doc',
                    route: '/docs/manage/administrator-guide/sso/user-guides/saml-microsoft-entra',
                    label: 'Microsoft Entra ID - SAML Authentication',
                  },
                  {
                    type: 'doc',
                    route: '/docs/manage/administrator-guide/sso/user-guides/sso-google',
                    label: 'Google Workspace - Single Sign-on Authentication',
                  },
                  {
                    type: 'doc',
                    route: '/docs/tutorial/setting-up-sso-saml-with-keycloak',
                    label: 'Setting Up SSO SAML 2.0 With Keycloak',
                  },
                ],
              },
            ],
          },
          {
            type: 'doc',
            route: '/docs/telemetry',
            label: 'Statistics Reporting',
          },
          {
            type: 'doc',
            route: '/docs/tutorial/setting-up-tls-for-signoz',
            label: 'Secure SigNoz in Kubernetes using Ingress-NGINX and Cert-Manager',
          },
          {
            type: 'doc',
            route: '/docs/userguide/retention-period',
            label: 'Retention Period',
          },
          {
            type: 'doc',
            route: '/docs/tutorial/infinite-retention-aws-s3',
            label: 'Infinite Retention using AWS S3',
          },
          {
            type: 'doc',
            route: '/docs/tutorial/s3-integration-iam-role-eks',
            label: 'S3 Integration With AWS IAM role in EKS',
          },
          {
            type: 'doc',
            route: '/docs/tutorial/oci-bucket-cold-storage-integration',
            label: 'OCI Bucket Cold Storage Integration',
          },
          {
            type: 'doc',
            route: '/docs/userguide/otlp-http-enable-cors',
            label: 'CORS in OTLP HTTP Receiver',
          },
          {
            type: 'doc',
            route: '/docs/operate/reset-admin-password',
            label: 'Reset Admin Password',
          },
        ],
      },
    ],
  },
  {
    label: 'Collection Agents',
    type: 'category',
    isExpanded: false,
    route: '/docs/opentelemetry-collection-agents/get-started',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'Kubernetes',
        route: '/docs/opentelemetry-collection-agents/k8s/get-started',
        items: [
          {
            type: 'category',
            label: 'K8s-Infra',
            isExpanded: false,
            items: [
              {
                label: 'Overview',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
              },
              {
                label: 'Install K8s Infra',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/install-k8s-infra',
              },
              {
                label: 'Configure K8s Infra',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/configure-k8s-infra',
              },
              {
                type: 'category',
                label: 'User Guides',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-cluster',
                    label: 'Monitoring Kubernetes Clusters using Opentelemetry Collection Agents',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-infra-multi-cluster',
                    label: 'Monitor Multiple Kubernetes Clusters',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/upgrade-k8s-infra-v0.15',
                    label: 'Upgrade k8s-infra to v0.15.0',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-infra-kubelet-endpoint',
                    label:
                      'Configuring Kubernetes Metrics Collection for IPv6 and Non-Standard Clusters',
                  },
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/k8s-infra/user-guides/k8s-infra-kubelet-autogke',
                    label: 'Configuring Kubernetes Metrics Collection for GKE Autopilot',
                  },
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Serverless (EKS Fargate)',
            isExpanded: false,
            items: [
              {
                label: 'Overview',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/serverless/overview',
              },
              {
                label: 'Install',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/serverless/install',
              },
              {
                label: 'Configure',
                type: 'doc',
                route: '/docs/opentelemetry-collection-agents/k8s/serverless/configure',
              },
              {
                type: 'category',
                label: 'User Guides',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/k8s/serverless/user-guides/k8s-cluster',
                    label:
                      'Monitoring Kubernetes Clusters in EKS Fargate using Opentelemetry Collection Agents',
                  },
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'OpenTelemetry Operator',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                label: 'Overview',
                route: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
              },
              {
                type: 'doc',
                label: 'Install',
                route: '/docs/opentelemetry-collection-agents/k8s/otel-operator/install',
              },
              {
                type: 'doc',
                label: 'Configure',
                route: '/docs/opentelemetry-collection-agents/k8s/otel-operator/configure',
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'VM',
        items: [
          {
            type: 'category',
            label: 'OpenTelemetry Binary',
            isExpanded: false,
            items: [
              {
                route: '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine',
                type: 'doc',
                label: 'Overview',
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Docker',
        items: [
          {
            type: 'category',
            label: 'Standalone',
            isExpanded: false,
            items: [
              {
                route: '/docs/opentelemetry-collection-agents/docker/install',
                type: 'doc',
                label: 'Install',
              },
            ],
          },
          {
            type: 'category',
            label: 'Swarm',
            isExpanded: false,
            items: [
              {
                route: '/docs/opentelemetry-collection-agents/docker-swarm/install',
                type: 'doc',
                label: 'Install',
              },
              {
                route: '/docs/opentelemetry-collection-agents/docker-swarm/configure',
                type: 'doc',
                label: 'Configure',
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'ECS',
        isExpanded: false,
        items: [
          {
            type: 'category',
            label: 'EC2',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                label: 'Overview',
                route: '/docs/opentelemetry-collection-agents/ecs/ec2/overview',
              },
              {
                type: 'doc',
                label: 'Install',
                route: '/docs/opentelemetry-collection-agents/ecs/ec2/install',
              },
              {
                type: 'doc',
                label: 'Configure',
                route: '/docs/opentelemetry-collection-agents/ecs/ec2/configure',
              },
              {
                type: 'category',
                label: 'User Guides',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route: '/docs/opentelemetry-collection-agents/ecs/ec2/user-guides/get-started',
                    label: 'Monitoring ECS EC2 using Opentelemetry Collection Agentss',
                  },
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Serverless',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                label: 'Overview',
                route: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
              },
              {
                type: 'doc',
                label: 'Install',
                route: '/docs/opentelemetry-collection-agents/ecs/sidecar/install',
              },
              {
                type: 'doc',
                label: 'Configure',
                route: '/docs/opentelemetry-collection-agents/ecs/sidecar/configure',
              },
              {
                type: 'category',
                label: 'User Guides',
                isExpanded: false,
                items: [
                  {
                    type: 'doc',
                    route:
                      '/docs/opentelemetry-collection-agents/ecs/sidecar/user-guides/get-started',
                    label: 'Monitoring ECS Fargate using Opentelemetry Collection Agents',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'OpenTelemetry Collector Reference',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            label: 'Configuration & Components',
            route: '/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration',
          },
          {
            type: 'doc',
            label: 'Switch to Collector',
            route:
              '/docs/opentelemetry-collection-agents/opentelemetry-collector/switch-to-collector',
          },
          {
            type: 'doc',
            label: 'Why Use Collector',
            route:
              '/docs/opentelemetry-collection-agents/opentelemetry-collector/why-to-use-collector',
          },
        ],
      },
    ],
  },
  {
    label: 'APM & Distributed Tracing',
    type: 'category',
    isExpanded: false,
    route: '/docs/instrumentation/overview',
    items: [
      {
        type: 'doc',
        route: '/docs/instrumentation/overview',
        label: 'Get Started',
      },
      {
        label: 'Instrument Application',
        type: 'category',
        isExpanded: false,
        route: '/docs/instrumentation',
        // link: {
        // type: 'generated-index',
        // title: 'Instrument your Application',
        // description:
        // 'To instrument your application with OpenTelemetry and send data to SigNoz, follow the instructions in the sections below.',
        // slug: '/docs/instrumentation/index',
        // },
        items: [
          {
            type: 'category',
            isExpanded: false,
            label: 'Python',
            route: '/docs/instrumentation/opentelemetry-python',
            // link: {
            // type: 'doc',
            // route: '/docs/instrumentation/opentelemetry-python',
            // title: 'Python',
            // description: 'Learn how to instrument Python applications with OpenTelemetry',
            // slug: 'instrumentation/python',
            // },
            items: [
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-django',
                label: 'Django ',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-fastapi',
                label: 'FastAPI ',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-flask',
                label: 'Flask ',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-falcon',
                label: 'Falcon ',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-hypercorn-unicorn-support',
                label: 'Hypercorn/Unicorn ',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-celery',
                label: 'Celery Worker OpenTelemetry Setup',
              },
            ],
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Java',
            route: '/docs/instrumentation/opentelemetry-java',
            // link: {
            // type: 'doc',
            // route: '/docs/instrumentation/opentelemetry-java',
            // title: 'Java',
            // description: 'Learn how to instrument Java applications with OpenTelemetry',
            // slug: 'instrumentation/java',
            // },
            items: [
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-springboot',
                label: 'Spring Boot',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-quarkus',
                label: 'Quarkus',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-tomcat',
                label: 'Tomcat',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/opentelemetry-jboss',
                label: 'JBoss',
              },
            ],
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Javascript',
            route: '/docs/instrumentation/javascript/overview',
            items: [
              {
                type: 'doc',
                route: '/docs/instrumentation/javascript/opentelemetry-nodejs',
                label: 'Node.js',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/javascript/opentelemetry-nextjs',
                label: 'Next.js',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/javascript/opentelemetry-react-native',
                label: 'React Native',
              },
              {
                type: 'doc',
                route: '/docs/instrumentation/javascript/opentelemetry-nuxtjs',
                label: 'Nuxt.js',
              },
            ],
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Golang',
            route: '/docs/instrumentation/opentelemetry-golang',
            items: [
              {
                type: 'doc',
                label: 'Manual Instrumentation',
                route: '/docs/instrumentation/manual-instrumentation/golang/manual-instrumentation',
              },
            ],
          },
          {
            type: 'doc',
            label: 'PHP',
            route: '/docs/instrumentation/opentelemetry-php',
          },
          {
            type: 'doc',
            label: 'Laravel',
            route: '/docs/instrumentation/opentelemetry-laravel',
          },
          {
            type: 'doc',
            label: '.NET',
            route: '/docs/instrumentation/opentelemetry-dotnet',
          },
          {
            type: 'doc',
            label: 'Ruby on Rails',
            route: '/docs/instrumentation/opentelemetry-ruby-on-rails',
          },
          {
            type: 'doc',
            label: 'Elixir',
            route: '/docs/instrumentation/opentelemetry-elixir',
          },
          {
            type: 'doc',
            label: 'Rust',
            route: '/docs/instrumentation/opentelemetry-rust',
          },
          {
            type: 'doc',
            label: 'C++',
            route: '/docs/instrumentation/opentelemetry-cpp',
          },
          {
            type: 'doc',
            label: 'Swift',
            route: '/docs/instrumentation/opentelemetry-swift',
          },
          {
            type: 'doc',
            route: '/docs/instrumentation/opentelemetry-nginx',
            label: 'NGINX',
          },
          {
            type: 'doc',
            route: '/docs/instrumentation/opentelemetry-wordpress',
            label: 'WordPress',
          },
          {
            type: 'doc',
            route: '/docs/instrumentation/opentelemetry-cloudflare',
            label: 'Cloudflare Workers',
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Manual Instrumentation',
            // route: '',
            // link: {
            // type: 'doc',
            // },
            items: [
              {
                type: 'category',
                isExpanded: false,
                label: 'Java',
                items: [
                  {
                    type: 'doc',
                    route: '/docs/instrumentation/manual-instrumentation/java/annotations',
                    label: 'Using Annotations',
                  },
                ],
              },
              {
                type: 'category',
                isExpanded: false,
                label: 'JavaScript',
                // route: '',
                // link: {
                // type: 'doc',
                // },
                items: [
                  {
                    type: 'doc',
                    label: 'NodeJS',
                    route:
                      '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs',
                  },
                  {
                    type: 'doc',
                    label: 'Enable/disable Instrumentation',
                    route:
                      '/docs/instrumentation/manual-instrumentation/javascript/nodejs-selective-instrumentation',
                  },
                ],
              },
            ],
          },
          // {
          //   type: 'category',
          //   isExpanded: false,
          //   label: 'Mobile Instrumentation',
          //   route: '/docs/mobile-instrumentation',
          //
          //   // route: '',
          //   // link: {
          //   // type: 'doc',
          //   // },
          //   items: [

          //   ],
          // },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'APM Product Overview',
        // route: '',
        items: [
          {
            type: 'doc',
            label: 'View Services',
            route: '/docs/userguide/metrics',
          },
          {
            type: 'doc',
            label: 'Calculated Fields in Spans',
            route: '/docs/traces-management/guides/derived-fields-spans',
          },
          {
            type: 'doc',
            label: 'Entry Point Spans',
            route: '/docs/traces-management/guides/entry-point-spans-service-overview',
          },
          {
            type: 'doc',
            label: 'APM Dashboards/Alerts',
            route: '/docs/userguide/custom-apm-dashboards-alerts',
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'View Traces',
            route: '/docs/userguide/traces',
            // link: {
            // type: 'doc',
            // },
            items: [
              {
                type: 'doc',
                label: 'Trace Details',
                route: '/docs/userguide/span-details',
              },
            ],
          },
          {
            type: 'doc',
            label: 'Service Map (Beta)',
            route: '/docs/userguide/service-map',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Tutorials',
        // route: '',
        items: [
          {
            type: 'doc',
            route: '/docs/application-monitoring/api-monitoring',
            label: 'API Monitoring',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/guides/apm-metrics',
            label: 'APM Metrics',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/guides/drop-spans',
            label: 'Control Traces Volume',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/guides/pii-scrubbing/',
            label: 'PII Scrubbing',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/guides/correlate-traces-and-logs',
            label: 'Correlate Traces and Logs',
          },
        ],
      },
      {
        type: 'category',
        route: '/docs/traces-management/troubleshooting/troubleshooting',
        label: 'Troubleshooting',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/traces-management/troubleshooting/faqs',
            label: 'General FAQs',
          },
        ],
      },
    ],
  },
  {
    label: 'Infrastructure Monitoring',
    type: 'category',
    isExpanded: false,
    // route: '',
    items: [
      {
        type: 'doc',
        route: '/docs/infrastructure-monitoring/overview',
        label: 'Overview',
      },
      {
        type: 'doc',
        route: '/docs/userguide/hostmetrics',
        label: 'Host Setup',
      },
      {
        type: 'doc',
        route: '/docs/userguide/k8s-metrics',
        label: 'Kubernetes Metrics',
      },
    ],
  },
  {
    label: 'Logs Management',
    type: 'category',
    isExpanded: false,
    route: '/docs/userguide/logs',
    items: [
      {
        type: 'doc',
        route: '/docs/userguide/logs',
        label: 'Get Started',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Send Logs to SigNoz',
        route: '/docs/logs-management/send-logs-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/collect_kubernetes_pod_logs',
            label: 'Kubernetes pod logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/collect_docker_logs',
            label: 'Docker logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/heroku_logs_to_signoz',
            label: 'Heroku logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/vercel_logs_to_signoz',
            label: 'Vercel logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/send-logs-http',
            label: 'HTTP logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/collecting_syslogs',
            label: 'Syslogs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/logrus-to-signoz',
            label: 'Logrus',
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Application Logs',
            route: '/docs/logs-management/send-logs/application-logs',
            items: [
              {
                type: 'doc',
                route: '/docs/userguide/collect_logs_from_file',
                label: 'From Log File',
              },
              {
                type: 'doc',
                route: '/docs/userguide/python-logs-auto-instrumentation',
                label: 'Python Logs Auto-Instrumentation',
              },
              {
                type: 'doc',
                route: '/docs/userguide/collecting_application_logs_otel_sdk_python',
                label: 'Using OTel Python SDK',
              },
              {
                type: 'doc',
                route: '/docs/userguide/collecting_application_logs_otel_sdk_java',
                label: 'Using OTel Java SDK',
              },
              {
                type: 'doc',
                route: '/docs/logs-management/send-logs/aws-lambda-nodejs',
                label: 'AWS Lambda Node.js logs',
              },
              {
                type: 'doc',
                route: '/docs/logs-management/send-logs/nodejs-logs',
                label: 'Node.js logs',
              },
              {
                type: 'doc',
                route: '/docs/logs-management/send-logs/nodejs-pino-logs',
                label: 'Pino Node.js logs',
              },
              {
                type: 'doc',
                route: '/docs/logs-management/send-logs/nodejs-winston-logs',
                label: 'Winston Node.js logs',
              },
              {
                type: 'doc',
                route: '/docs/logs-management/send-logs/opentelemetry-nodejs-bunyan-logs',
                label: 'Bunyan Node.js logs',
              },
            ],
          },
          {
            type: 'doc',
            route: '/docs/userguide/send-cloudwatch-logs-to-signoz',
            label: 'Cloudwatch logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/cloudflare-logs',
            label: 'Cloudflare logs',
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Existing Collectors to SigNoz',
            items: [
              {
                type: 'doc',
                route: '/docs/userguide/fluentbit_to_signoz',
                label: 'FluentBit to SigNoz',
              },
              {
                type: 'doc',
                route: '/docs/userguide/fluentd_to_signoz',
                label: 'FluentD to SigNoz',
              },
              {
                type: 'doc',
                route: '/docs/userguide/logstash_to_signoz',
                label: 'Logstash to SigNoz',
              },
            ],
          },
          {
            type: 'doc',
            route:
              '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs',
            label: 'Tomcat',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/vector-logs-to-signoz',
            label: 'Vector',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/zap-to-signoz',
            label: 'Zap',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/windows-events-log',
            label: 'Windows Event logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/collect-systemd-logs',
            label: 'SystemD logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/send-logs/zerolog-to-signoz',
            label: 'Zerolog',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Preprocess Logs',
        route: '/docs/logs-pipelines/introduction',
        // link: {
        // type: 'doc',
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/logs-pipelines/concepts',
            label: 'Concepts',
          },
          {
            type: 'doc',
            route: '/docs/logs-pipelines/processors',
            label: 'Log Processors',
          },
          {
            type: 'category',
            isExpanded: false,
            label: 'Guides',
            route: '/docs/category/guides',
            // link: {
            // type: 'generated-index',
            // title: 'Logs Pipeline Guides',
            // description:
            // 'See these guides for detailed walkthroughs on creating Log Pipelines for specific purposes.',
            // },
            items: [
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/json',
                label: 'Parse JSON logs',
              },
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/trace',
                label: 'Parse Trace Information',
              },
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/resource',
                label: 'Parse Container Name',
              },
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/nested-json',
                label: 'Parse Nested JSON',
              },
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/severity-parsing',
                label: 'Severity Parsing',
              },
              {
                type: 'doc',
                route: '/docs/logs-pipelines/guides/timestamp-parsing',
                label: 'Parse Timestamp',
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Features',
        // route: '',
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/logs_fields',
            label: 'Fields in Logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/logs_query_builder',
            label: 'Logs Query Builder',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/features/logs-quick-filters',
            label: 'Logs Quick Filters',
          },
        ],
      },
      {
        type: 'category',
        label: 'User Guide',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/logs-management/guides/drop-logs',
            label: 'Drop Logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/guides/pii-scrubbing',
            label: 'PII Scrubbing',
          },
          {
            type: 'doc',
            route: '/docs/userguide/parse-multiline-logs',
            label: 'Parse Multiline Logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/guides/set-resource-attributes-for-logs',
            label: 'Set Resource Attributes',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/logs-management/long-term-storage',
        label: 'Long Term Storage',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Troubleshooting',
        route: '/docs/logs-management/troubleshooting/troubleshooting',
        items: [
          {
            type: 'doc',
            route: '/docs/logs-management/troubleshooting/faqs',
            label: 'General FAQs',
          },
        ],
      },
      // {
      //   type: 'doc',
      //   route: '/docs/logs-management/guides/drop-logs',
      //   label: 'Guide to drop logs',
      // },
    ],
  },
  {
    label: 'Metrics',
    type: 'category',
    isExpanded: false,
    route: '/docs/metrics-management/overview',
    items: [
      {
        type: 'doc',
        route: '/docs/metrics-management/overview',
        label: 'Overview',
      },
      {
        label: 'Send Metrics',
        type: 'category',
        isExpanded: false,
        route: '/docs/metrics-management/send-metrics',
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/otel-metrics-receivers',
            label: 'OpenTelemetry Receivers',
          },
          {
            type: 'doc',
            route: '/docs/userguide/prometheus-metrics',
            label: 'Prometheus Metrics',
          },
          {
            type: 'category',
            label: 'Infrastructure',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/metrics-management/docker-container-metrics',
                label: 'Docker container metrics',
              },
              {
                type: 'doc',
                route: '/docs/tutorial/traefik-observability',
                label: 'Traefik Observability',
              },
            ],
          },
          {
            type: 'category',
            label: 'Databases',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/tutorial/mongodb-metrics',
                label: 'MongoDB Metrics',
              },
              {
                type: 'doc',
                route: '/docs/metrics-management/mysql-metrics',
                label: 'MySQL',
              },
            ],
          },
          {
            type: 'category',
            label: 'Web Servers',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/metrics-management/nginx-metrics',
                label: 'NGINX',
              },
            ],
          },
          {
            type: 'category',
            label: 'Runtimes',
            isExpanded: false,
            items: [
              {
                type: 'doc',
                route: '/docs/tutorial/jvm-metrics',
                label: 'JVM',
              },
              {
                type: 'doc',
                route: '/docs/tutorial/jmx-metrics',
                label: 'JMX Metrics',
              },
            ],
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/metrics-explorer',
        label: 'Metrics Explorer',
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/types-and-aggregation',
        label: 'Types and Aggregation',
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/data-storage',
        label: 'Metrics Tables',
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/cloud-provider-metric-delay',
        label: 'Cloud provider metric delay',
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/configure-custom-buckets',
        label: 'Configure custom buckets for histograms',
      },
      {
        type: 'doc',
        route: '/docs/userguide/drop-metrics',
        label: 'Drop Metrics',
      },
      {
        type: 'category',
        route: '/docs/metrics-management/troubleshooting/troubleshooting',
        label: 'Troubleshooting',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/metrics-management/troubleshooting/faqs',
            label: 'General FAQs',
          },
        ],
      },
    ],
  },
  {
    label: 'Cost Meter',
    type: 'category',
    isExpanded: false,
    items: [
      {
        type: 'doc',
        route: '/docs/cost-meter/overview',
        label: 'Overview',
      },
      {
        type: 'doc',
        route: '/docs/cost-meter/meter-explorer',
        label: 'Meter Explorer',
      },
      {
        type: 'doc',
        route: '/docs/cost-meter/alerts',
        label: 'Alerts',
      },
    ],
  },
  {
    label: 'Dashboards',
    type: 'category',
    isExpanded: false,
    // route: '',
    items: [
      {
        label: 'Manage',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/manage-dashboards',
            label: 'Manage Dashboards',
          },
          {
            type: 'doc',
            route: '/docs/userguide/manage-panels',
            label: 'Manage Panels',
          },
          {
            type: 'doc',
            route: '/docs/userguide/manage-variables',
            label: 'Manage Variables',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/terraform-provider-signoz',
            label: 'Terraform Provider',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        route: '/docs/dashboards/panel-types',
        label: 'Panel Types',
        items: [
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/bar',
            label: 'Bar Chart',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/histogram',
            label: 'Histogram',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/list',
            label: 'List',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/pie',
            label: 'Pie',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/table',
            label: 'Table',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/timeseries',
            label: 'Timeseries',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/panel-types/value',
            label: 'Value',
          },
        ],
      },
      {
        type: 'category',
        route: '/docs/dashboards/interactivity',
        label: 'Interactivity',
      },
      {
        type: 'doc',
        route: '/docs/dashboards/import-dashboard',
        label: 'Import Dashboard',
      },
      {
        type: 'category',
        isExpanded: false,
        route: '/docs/dashboards/dashboard-templates/overview',
        label: 'Out of Box Dashboards',
        items: [
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/amazon-bedrock-dashboard',
            label: 'Amazon Bedrock API',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/anthropic-dashboard',
            label: 'Anthropic API',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/apache-web-server',
            label: 'Apache Web Server',
          },
          {
            label: 'APM',
            type: 'category',
            isExpanded: false,
            route: '/docs/dashboards/dashboard-templates/apm-dashboards',
            items: [
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/apm-metrics',
                label: 'APM Metrics',
              },
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/db-calls-monitoring',
                label: 'DB Calls Monitoring',
              },
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/http-api-monitoring',
                label: 'HTTP API Monitoring',
              },
            ],
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/argocd-dashboard',
            label: 'ArgoCD',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/autogen-dashboard',
            label: 'Autogen',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/aws-sqs-prometheus',
            label: 'AWS SQS',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/azure-openai-dashboard',
            label: 'Azure OpenAI API',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/cicd',
            label: 'CI/CD',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/claude-code-dashboard',
            label: 'Claude Code',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/cost-meter',
            label: 'Cost Meter',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/couchdb',
            label: 'CouchDB',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/crewai-dashboard',
            label: 'Crew AI',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/deepseek-dashboard',
            label: 'DeepSeek API',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/docker-container-metrics',
            label: 'Docker Container',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/frontend-monitoring',
            label: 'Frontend Monitoring',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/google-gemini-dashboard',
            label: 'Google Gemini',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/haproxy-monitoring',
            label: 'HAProxy',
          },
          {
            label: 'Hostmetrics',
            type: 'category',
            isExpanded: false,
            route: '/docs/dashboards/dashboard-templates/hostmetrics-dashboards',
            items: [
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/hostmetrics-k8s',
                label: 'Hostmetrics (K8s)',
              },
            ],
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/jvm-metrics',
            label: 'JVM',
          },
          {
            label: 'Kubernetes',
            type: 'category',
            isExpanded: false,
            route: '/docs/dashboards/dashboard-templates/kubernetes-dashboards',
            items: [
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/kubernetes-cluster-metrics',
                label: 'Kubernetes Cluster Metrics Dashboard',
              },
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-detailed',
                label: 'Kubernetes Pod Metrics (Detailed)',
              },
              {
                type: 'doc',
                route: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed',
                label: 'Kubernetes Node Metrics (Detailed)',
              },
            ],
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/key-operations',
            label: 'Key Operations',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/mastra-dashboard',
            label: 'Mastra',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/memcached',
            label: 'Memcached',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/mysql',
            label: 'MySQL',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/nginx',
            label: 'NGINX',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/postgresql',
            label: 'PostgreSQL',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/pydantic-ai-dashboard',
            label: 'Pydantic AI',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/rabbitmq',
            label: 'RabbitMQ',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/semantic-kernel-dashboard',
            label: 'Semantic Kernel',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/signoz-ingestion-analysis',
            label: 'SigNoz Ingestion Analysis',
          },
          {
            type: 'doc',
            route: '/docs/dashboards/dashboard-templates/vercel-ai-sdk-dashboard',
            label: 'Vercel AI SDK',
          },
        ],
      },
      {
        type: 'category',
        route: '/docs/dashboards/troubleshooting/troubleshooting',
        label: 'Troubleshooting',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/dashboards/troubleshooting/faqs',
            label: 'General FAQs',
          },
        ],
      },
    ],
  },
  {
    label: 'Querying',
    type: 'category',
    isExpanded: false,
    // route: '',
    items: [
      // {
      //   type: 'doc',
      //   route: '/docs/userguide/create-a-custom-query',
      //   label: 'Create a Custom Query',
      // },
      {
        type: 'doc',
        route: '/docs/userguide/query-builder',
        label: 'Query Builder',
      },
      {
        type: 'doc',
        route: '/docs/userguide/query-builder-v5',
        label: 'Query Builder (new)',
      },
      {
        type: 'doc',
        route: '/docs/userguide/search-syntax',
        label: 'Search Syntax',
      },
      {
        type: 'doc',
        route: '/docs/userguide/operators-reference',
        label: 'Operators Reference',
      },
      {
        type: 'doc',
        route: '/docs/userguide/full-text-search',
        label: 'Full-Text Search Guide',
      },
      {
        type: 'doc',
        route: '/docs/userguide/functions-reference',
        label: 'Functions Reference',
      },
      {
        type: 'doc',
        route: '/docs/userguide/field-context-data-types',
        label: 'Field Context & Data Types',
      },
      {
        type: 'doc',
        route: '/docs/userguide/search-troubleshooting',
        label: 'Troubleshooting Guide',
      },
      {
        type: 'doc',
        route: '/docs/userguide/search-advanced-examples',
        label: 'Advanced Examples',
      },
      {
        type: 'category',
        isExpanded: false,
        // route: '',
        label: 'ClickHouse Query',
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/write-a-metrics-clickhouse-query',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/userguide/logs_clickhouse_queries',
            label: 'Logs',
          },
          {
            type: 'doc',
            route: '/docs/userguide/writing-clickhouse-traces-query',
            label: 'Traces',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'PromQl Query',
        items: [
          {
            type: 'doc',
            route: '/docs/userguide/write-a-prom-query-with-new-format',
            label: 'PromQl Query New Format',
          },
        ],
      },
    ],
  },
  {
    label: 'Alerts',
    type: 'category',
    isExpanded: false,
    route: '/docs/alerts',
    // link: {
    //   type: 'generated-index',
    //   title: 'Alert Management in SigNoz',
    //   description:
    //     'This documentation helps you in understanding the Alerts feature in SigNoz and how you can create different types of alerts.',
    //   slug: '/docs/alerts',
    // },
    items: [
      {
        type: 'doc',
        route: '/docs/userguide/alerts-management',
        label: 'Alert Management',
      },
      // {
      //   type: 'doc',
      //   route: 'product-features/alerts/alerts-notification-channel',
      //   label: 'Notification Channel',
      // },
      {
        label: 'Setup Alerts Notification',
        type: 'category',
        isExpanded: false,
        route: '/docs/setup-alerts-notification',
        // link: {
        //   type: 'generated-index',
        //   title: 'Setup Alerts Notifications Channel',
        //   description:
        //     'You can setup notification channel for sending the generated alerts to other applications. Currently, the following channels are supported.',
        //   slug: '/docs/setup-alerts-notification',
        // type: "doc",
        // route: "product-features/alerts/alerts-notification-channel",
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/slack',
            label: 'Slack',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/webhook',
            label: 'Webhook',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/incident-io',
            label: 'Incident.io (Prometheus Alertmanager Webhook)',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/rootly',
            label: 'Rootly (Prometheus Alertmanager Webhook)',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/zenduty',
            label: 'Zenduty (Prometheus Alertmanager Webhook)',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/pagerduty',
            label: 'PagerDuty',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/opsgenie',
            label: 'Opsgenie',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/ms-teams',
            label: 'MS Teams',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/notification-channel/email',
            label: 'Email',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/anomaly-based-alerts',
        label: 'Anomaly based Alert',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/metrics-based-alerts',
        label: 'Metrics based Alert',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/log-based-alerts',
        label: 'Log based Alert',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/trace-based-alerts',
        label: 'Trace based Alert',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/exceptions-based-alerts',
        label: 'Exceptions based Alert',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/planned-maintenance',
        label: 'Planned Maintenance',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/routing-policy',
        label: 'Routing Policies',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/alerts-history',
        label: 'Alerts History',
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/terraform-provider-signoz',
        label: 'Terraform Provider',
      },
      {
        type: 'category',
        route: '/docs/alerts-management/troubleshooting/troubleshooting',
        label: 'Troubleshooting',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/alerts-management/troubleshooting/faqs',
            label: 'General FAQs',
          },
          {
            type: 'doc',
            route:
              '/docs/alerts-management/troubleshooting/alerts-firing-without-visible-threshold-breach',
            label: 'Alerts Firing Without Visible Threshold Breach',
          },
        ],
      },
      {
        type: 'category',
        route: '/docs/alerts-management/user-guides/user-guides',
        label: 'User Guides',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/alerts-management/user-guides/understanding-alert-evaluation-patterns',
            label: 'Understanding Alert Evaluation Patterns',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/user-guides/time-aggregation-best-practices',
            label: 'Time Aggregation Best Practices',
          },
          {
            type: 'doc',
            route: '/docs/alerts-management/user-guides/how-to-configure-alerts-for-missing-data',
            label: 'How to Configure Alerts for Missing Data',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/alerts-management/apdex-alerts',
        label: 'Apdex Alerts',
      },
    ],
  },
  {
    label: 'Frontend Monitoring',
    type: 'category',
    isExpanded: false,
    route: '/docs/frontend-monitoring',
    items: [
      {
        type: 'doc',
        route: '/docs/frontend-monitoring/sending-logs-with-opentelemetry',
        label: 'Sending Logs',
      },
      {
        type: 'doc',
        route: '/docs/frontend-monitoring/sending-traces-with-opentelemetry',
        label: 'Sending Traces',
      },
      {
        type: 'doc',
        route: '/docs/frontend-monitoring/sending-metrics-with-opentelemetry',
        label: 'Sending Metrics',
      },
      {
        type: 'category',
        isExpanded: false,
        route: '/docs/frontend-monitoring/opentelemetry-web-vitals',
        label: 'Web Vitals',
        items: [
          {
            type: 'doc',
            route: '/docs/frontend-monitoring/web-vitals-with-metrics',
            label: 'Web Vitals with Metrics',
          },
          {
            type: 'doc',
            route: '/docs/frontend-monitoring/web-vitals-with-traces',
            label: 'Web Vitals with Traces',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/frontend-monitoring/document-load',
        label: 'Document Load',
      },
    ],
  },
  {
    label: 'Mobile Monitoring',
    type: 'category',
    isExpanded: false,
    route: '/docs/mobile-monitoring',
    items: [
      {
        type: 'doc',
        label: 'Swift UI',
        route: '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui',
      },
      {
        type: 'doc',
        label: 'Java',
        route: '/docs/instrumentation/mobile-instrumentation/opentelemetry-java',
      },
      {
        type: 'doc',
        label: 'Kotlin',
        route: '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin',
      },
      {
        type: 'doc',
        label: 'Flutter',
        route: '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter',
      },
    ],
  },
  {
    type: 'category',
    isExpanded: false,
    route: '/docs/llm-observability',
    label: 'LLM Observability',

    items: [
      {
        route: '/docs/llm-community-integrations',
        label: 'LLM Community Integrations',
        type: 'doc',
      },
      {
        route: '/docs/amazon-bedrock-monitoring',
        label: 'Amazon Bedrock',
        type: 'doc',
      },
      {
        route: '/docs/anthropic-monitoring',
        label: 'Anthropic API',
        type: 'doc',
      },
      {
        route: '/docs/autogen-observability',
        label: 'AutoGen',
        type: 'doc',
      },
      {
        route: '/docs/azure-openai-monitoring',
        label: 'Azure OpenAI API',
        type: 'doc',
      },
      {
        route: '/docs/claude-code-monitoring',
        label: 'Claude Code',
        type: 'doc',
      },
      {
        route: '/docs/crewai-observability',
        label: 'Crew AI',
        type: 'doc',
      },
      {
        route: '/docs/deepseek-monitoring',
        label: 'DeepSeek',
        type: 'doc',
      },
      {
        route: '/docs/google-gemini-monitoring',
        label: 'Google Gemini',
        type: 'doc',
      },
      {
        route: '/docs/langchain-observability',
        label: 'LangChain/LangGraph',
        type: 'doc',
      },
      {
        route: '/docs/llamaindex-observability',
        label: 'LlamaIndex',
        type: 'doc',
      },
      {
        route: '/docs/mastra-observability',
        label: 'Mastra',
        type: 'doc',
      },
      {
        route: '/docs/openai-monitoring',
        label: 'OpenAI',
        type: 'doc',
      },
      {
        route: '/docs/pydantic-ai-observability',
        label: 'Pydantic AI',
        type: 'doc',
      },
      {
        route: '/docs/semantic-kernel-observability',
        label: 'Semantic Kernel',
        type: 'doc',
      },
      {
        route: '/docs/vercel-ai-sdk-observability',
        label: 'Vercel AI SDK',
        type: 'doc',
      },
    ],
  },
  {
    type: 'category',
    isExpanded: false,
    label: 'SigNoz MCP',

    items: [
      {
        type: 'doc',
        route: '/docs/signoz-mcp-server',
        label: 'SigNoz MCP Server',
      },
    ],
  },
  {
    label: 'Integrations',
    type: 'category',
    isExpanded: false,
    route: '/docs/integrations/integrations-list',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'One Click Integrations (AWS)',
        items: [
          {
            type: 'doc',
            route: '/docs/integrations/aws/one-click-aws-integrations',

            label: 'Overview',
          },
          {
            type: 'doc',
            route: '/docs/integrations/aws/ecs',

            label: 'ECS',
          },
          {
            type: 'doc',
            route: '/docs/integrations/aws/s3-sync',

            label: 'S3 Sync',
          },
        ],
      },
      {
        label: 'Temporal',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/integrations/temporal-cloud-metrics',
            label: 'Cloud Metrics',
          },
          {
            type: 'doc',
            route: '/docs/integrations/temporal-golang-opentelemetry',
            label: 'Golang',
          },
          {
            type: 'doc',
            route: '/docs/integrations/temporal-typescript-opentelemetry',
            label: 'Typescript',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/integrations/redis',
        label: 'Redis',
      },
      {
        type: 'doc',
        route: '/docs/integrations/postgresql',
        label: 'PostgreSQL',
      },
      {
        type: 'doc',
        route: '/docs/integrations/nginx',
        label: 'Nginx',
      },
      {
        type: 'doc',
        route: '/docs/integrations/mongodb',
        label: 'MongoDB',
      },
      {
        type: 'doc',
        route: '/docs/integrations/mongodb-atlas',
        label: 'MongoDB Atlas',
      },
      {
        type: 'doc',
        route: '/docs/integrations/clickhouse',
        label: 'Clickhouse',
      },
      {
        type: 'doc',
        route: '/docs/integrations/snowflake',
        label: 'Snowflake',
      },
      {
        type: 'doc',
        route: '/docs/integrations/aws-rds-postgres',
        label: 'AWS RDS PostgreSQL',
      },
      {
        type: 'doc',
        route: '/docs/integrations/aws-rds-mysql',
        label: 'AWS RDS MySQL',
      },
      {
        type: 'doc',
        route: '/docs/integrations/aws-elasticache-redis',
        label: 'AWS Elasticache Redis',
      },
      {
        type: 'doc',
        route: '/docs/integrations/sql-server',
        label: 'Microsoft SQL Server',
      },
      {
        type: 'doc',
        route: '/docs/integrations/supabase',
        label: 'Supabase',
      },
      {
        type: 'doc',
        route: '/docs/integrations/nomad',
        label: 'Nomad',
      },
    ],
  },
  {
    label: 'Messaging Queues',
    type: 'category',
    isExpanded: false,
    // route: '',
    items: [
      {
        type: 'doc',
        route: '/docs/messaging-queues/overview',
        label: 'Overview',
      },
      {
        label: 'Kafka',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/messaging-queues/kafka-overview',
            label: 'Overview',
          },
          {
            label: 'Setup',
            type: 'category',
            isExpanded: false,
            route: '/docs/messaging-queues/kafka-setup',
            items: [
              {
                type: 'doc',
                route: '/docs/messaging-queues/kafka',
                label: 'Self-Hosted Kafka',
              },
              {
                type: 'doc',
                route: '/docs/messaging-queues/msk',
                label: 'Amazon MSK',
              },
              {
                type: 'doc',
                route: '/docs/messaging-queues/strimzi',
                label: 'Strimzi',
              },
              {
                type: 'doc',
                route: '/docs/messaging-queues/confluent-kafka',
                label: 'Confluent Kafka',
              },
            ],
          },
        ],
      },
      {
        label: 'Celery',
        type: 'category',
        isExpanded: false,

        //route: '/docs/integrations/integrations-list',
        items: [
          {
            type: 'doc',
            route: '/docs/messaging-queues/celery-overview',
            label: 'Overview',
          },
          {
            label: 'Setup',
            type: 'doc',
            route: '/docs/messaging-queues/celery-setup',
          },
        ],
      },
    ],
  },
  {
    label: 'External API Monitoring',
    type: 'category',
    isExpanded: false,
    items: [
      {
        type: 'doc',
        route: '/docs/external-api-monitoring/overview',
        label: 'Overview',
      },
      {
        type: 'doc',
        route: '/docs/external-api-monitoring/setup',
        label: 'Setup',
      },
    ],
  },
  {
    label: 'Trace Funnels',
    type: 'category',
    isExpanded: false,
    items: [
      {
        type: 'doc',
        route: '/docs/trace-funnels/overview',
        label: 'Overview',
      },
      {
        type: 'doc',
        route: '/docs/trace-funnels/setup',
        label: 'Setup',
      },
    ],
  },
  {
    label: 'CI/CD Monitoring',
    type: 'category',
    isExpanded: false,
    route: '/docs/cicd/overview',
    items: [
      {
        type: 'doc',
        route: '/docs/cicd/overview',
        label: 'Overview',
      },
      {
        label: 'GitHub',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/cicd/github/github-metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/cicd/github/github-actions-traces',
            label: 'Traces',
          },
        ],
      },
      {
        label: 'Jenkins',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/cicd/jenkins/agent-node-monitoring',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/cicd/jenkins/jenkins-tracing',
            label: 'Traces',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/cicd/argocd/argocd-metrics',
        label: 'ArgoCD',
      },
    ],
  },
  {
    type: 'doc',
    route: '/docs/monitor-http-endpoints',
    label: 'Monitor HTTP Endpoints',
  },
  {
    type: 'doc',
    route: '/docs/userguide/exceptions',
    label: 'Monitoring Exceptions',
  },
  {
    label: 'Ingestion',
    type: 'category',
    isExpanded: false,
    items: [
      {
        label: 'SigNoz Cloud',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/ingestion/signoz-cloud/overview',
            label: 'Overview',
          },
          {
            type: 'doc',
            route: '/docs/ingestion/signoz-cloud/keys',
            label: 'Keys',
          },
          {
            type: 'doc',
            route: '/docs/ingestion/signoz-cloud/troubleshooting/troubleshooting',
            label: 'Troubleshooting',
          },
        ],
      },
      {
        label: 'Self-Host SigNoz',
        type: 'category',
        isExpanded: false,
        items: [
          {
            type: 'doc',
            route: '/docs/ingestion/self-hosted/overview',
            label: 'Overview',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/ingestion/cloud-vs-self-hosted',
        label: 'Cloud vs Self-Hosted',
      },
    ],
  },
  {
    label: 'SigNoz APIs',
    type: 'category',
    isExpanded: false,
    items: [
      {
        type: 'doc',
        route: '/api-reference/',
        label: 'API Reference',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Trace API',
        // route: '',
        items: [
          {
            type: 'doc',
            route: '/docs/traces-management/trace-api/overview',
            label: 'Overview',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/trace-api/payload-model',
            label: 'Payload Model',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/trace-api/search-traces',
            label: 'Search Traces',
          },
          {
            type: 'doc',
            route: '/docs/traces-management/trace-api/aggregate-traces',
            label: 'Aggregate Traces',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Logs API',
        // route: '',
        items: [
          {
            type: 'doc',
            route: '/docs/logs-management/logs-api/overview',
            label: 'Overview',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/logs-api/payload-model',
            label: 'Payload Model',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/logs-api/search-logs',
            label: 'Search Logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/logs-api/aggregate-logs',
            label: 'Aggregate Logs',
          },
          {
            type: 'doc',
            route: '/docs/logs-management/logs-api/logs-url-for-explorer-page',
            label: 'Logs URL for Explorer',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/metrics-management/query-range-api',
        label: 'Metrics Query API',
      },
    ],
  },
  {
    label: 'AWS Monitoring',
    type: 'category',
    isExpanded: false,
    items: [
      //'aws/getting-started',
      {
        type: 'category',
        isExpanded: false,
        label: 'EC2',
        route: '/docs/ec2-monitoring',
        // link: {
        // type: 'generated-index',
        // title: 'EC2 Monitoring',
        // slug: '/docs/ec2-monitoring',
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/aws-monitoring/ec2-logs',
            label: 'Application/Server logs',
          },
          {
            type: 'doc',
            route: '/docs/aws-monitoring/ec2-infra-metrics',
            label: 'Infrastructure Metrics',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'ECS',
        route: '/docs/ecs-monitoring',
        // link: {
        // type: 'generated-index',
        // title: 'ECS Monitoring',
        // slug: '/docs/ecs-monitoring',
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/aws-monitoring/ecs-ec2-external',
            label: 'EC2/External',
          },
          {
            type: 'doc',
            route: '/docs/aws-monitoring/ecs-fargate',
            label: 'Fargate',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/aws-monitoring/eks',
        label: 'EKS',
      },
      {
        type: 'doc',
        route: '/docs/aws-monitoring/elb-logs',
        label: 'ELB',
      },
      {
        type: 'doc',
        route: '/docs/aws-monitoring/vpc-logs',
        label: 'VPC',
      },
      {
        type: 'doc',
        route: '/docs/aws-monitoring/rds-logs',
        label: 'RDS',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'AWS Lambda',
        items: [
          {
            type: 'doc',
            route: '/docs/aws-monitoring/lambda/lambda-logs',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/aws-monitoring/lambda/lambda-traces',
            label: 'APM & Tracing',
          },
        ],
      },
    ],
  },
  {
    label: 'Migrate to SigNoz',
    type: 'category',
    isExpanded: false,
    route: '/docs/migration/migrate-to-signoz',
    items: [
      {
        label: 'From Datadog',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-datadog-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/opentelemetry-datadog-receiver',
            label: 'Using Datadog OTLP receiver',
          },
        ],
      },
      {
        label: 'From Grafana Stack',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-grafana-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-grafana/metrics',
            label: 'Migrating Metrics',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-grafana/traces',
            label: 'Migrating Traces',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-grafana/logs',
            label: 'Migrating Logs',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-grafana/dashboards',
            label: 'Migrating Dashboards',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-grafana/alerts',
            label: 'Migrating Alerts',
          },
        ],
      },
      {
        label: 'From ELK Stack',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-elk-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-elk/metrics',
            label: 'Migrating Metrics',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-elk/traces',
            label: 'Migrating Traces',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-elk/logs',
            label: 'Migrating Logs',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-elk/dashboards',
            label: 'Migrating Dashboards',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-elk/alerts',
            label: 'Migrating Alerts',
          },
        ],
      },
      {
        label: 'From New Relic',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-newrelic-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-newrelic/metrics',
            label: 'Migrating Metrics',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-newrelic/traces',
            label: 'Migrating Traces',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-newrelic/logs',
            label: 'Migrating Logs',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-newrelic/dashboards',
            label: 'Migrating Dashboards',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-newrelic/alerts',
            label: 'Migrating Alerts',
          },
        ],
      },
      {
        label: 'From Honeycomb',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-honeycomb-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-honeycomb/data',
            label: 'Migrating Data',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-honeycomb/dashboards',
            label: 'Migrating Dashboards',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-honeycomb/alerts',
            label: 'Migrating Alerts',
          },
        ],
      },
      {
        label: 'From OpenTelemetry',
        type: 'category',
        isExpanded: false,
        route: '/docs/migration/migrate-from-opentelemetry-to-signoz',
        items: [
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-opentelemetry/cloud',
            label: 'Migrate to SigNoz Cloud',
          },
          {
            type: 'doc',
            route: '/docs/migration/migrate-from-opentelemetry/self-hosted',
            label: 'Migrate to Self-Hosted SigNoz',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/migration/migrate-from-signoz-self-host-to-signoz-cloud',
        label: 'From Self-Hosted to Cloud',
      },
    ],
  },
  {
    label: 'Azure Monitoring',
    type: 'category',
    isExpanded: false,
    route: '/docs/azure-monitoring',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'Bootstrapping',
        route: '/docs/azure-monitoring/bootstrapping',
        // link: {
        // type: 'generated-index',
        // title: 'EC2 Monitoring',
        // slug: '/docs/ec2-monitoring',
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/bootstrapping/strategy',
            label: 'Strategy',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/bootstrapping/collector-setup',
            label: 'Central Collector Setup',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/bootstrapping/data-ingestion',
            label: 'EventHub Streaming Ingestion',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Virtual Machines',
        route: '/docs/azure-monitoring/virtual-machines',
        // link: {
        // type: 'generated-index',
        // title: 'ECS Monitoring',
        // slug: '/docs/ecs-monitoring',
        // },
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/virtual-machines/vm-metrics',
            label: 'VM Host Metrics & Logging',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'App Service',
        route: '/docs/azure-monitoring/app-service',
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/app-service/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/app-service/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/app-service/tracing',
            label: 'APM & Tracing',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/azure-monitoring/aks',
        label: 'AKS',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Azure Container Apps',
        route: '/docs/azure-monitoring/az-container-app',
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-container-apps/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-container-apps/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-container-apps/tracing',
            label: 'APM & Tracing ',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Azure Functions',
        route: '/docs/azure-monitoring/az-fns',
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-fns/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-fns/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-fns/tracing',
            label: 'APM & Tracing ',
          },
        ],
      },
      {
        type: 'doc',
        route: '/docs/azure-monitoring/db-metrics',
        label: 'SQL Database Metrics',
      },
      {
        type: 'doc',
        route: '/docs/azure-monitoring/mysql-flexible-server',
        label: 'MySQL Flexible Server',
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Azure Blob Storage',
        route: '/docs/azure-monitoring/az-blob-storage',
        items: [
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-blob-storage/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/azure-monitoring/az-blob-storage/logging',
            label: 'Logging',
          },
        ],
      },
    ],
  },
  {
    label: 'GCP Monitoring',
    type: 'category',
    isExpanded: false,
    route: '/docs/gcp-monitoring',
    items: [
      {
        type: 'category',
        isExpanded: false,
        label: 'Bootstrapping',
        route: '/docs/gcp-monitoring/bootstrapping',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/bootstrapping/pubsub-topic-creation',
            label: 'Creating Pub/Sub Topic',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/bootstrapping/log-router-setup',
            label: 'Log Router Setup',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/bootstrapping/gce-creation',
            label: 'Creating Compute Engine',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Cloud Functions',
        route: '/docs/gcp-monitoring/gcp-fns',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-fns/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-fns/custom-metrics',
            label: 'Custom Metrics',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-fns/fns-metrics',
            label: 'Cloud Function Metrics',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-fns/tracing',
            label: 'APM & Tracing',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'App Engine',
        route: '/docs/gcp-monitoring/app-engine',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/app-engine/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/app-engine/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/app-engine/tracing',
            label: 'APM & Tracing',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Compute Engine',
        route: '/docs/gcp-monitoring/compute-engine',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/compute-engine/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/compute-engine/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/compute-engine/tracing',
            label: 'APM & Tracing',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Cloud Storage',
        route: '/docs/gcp-monitoring/gcs',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcs/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcs/metrics',
            label: 'Metrics',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Cloud SQL',
        route: '/docs/gcp-monitoring/cloud-sql',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-sql/cloud-sql-creation',
            label: 'Creating Cloud SQL',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-sql/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-sql/metrics',
            label: 'Metrics',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Cloud Load Balancer',
        route: '/docs/gcp-monitoring/gcp-clb',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-clb/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gcp-clb/metrics',
            label: 'Metrics',
          },
        ],
      },
      {
        type: 'category',
        isExpanded: false,
        label: 'Serverless VPC Access Connector',
        route: '/docs/gcp-monitoring/vpc',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/vpc/vpc-connector-creation',
            label: 'Creating Serverless VPC Access Connector',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/vpc/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/vpc/metrics',
            label: 'Metrics',
          },
        ],
      },
      {
        label: 'GKE',
        type: 'category',
        isExpanded: false,
        route: '/docs/gcp-monitoring/gke',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gke/gke-tracing',
            label: 'APM & Tracing',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/gke/gke-logging-and-metrics',
            label: 'Logs and Metrics',
          },
        ],
      },
      {
        label: 'Cloud Run',
        type: 'category',
        isExpanded: false,
        route: '/docs/gcp-monitoring/cloud-run',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-run/cloud-run-setup',
            label: 'Cloud Run Service Setup',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-run/logging',
            label: 'Logging',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-run/metrics',
            label: 'Metrics',
          },
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-run/tracing',
            label: 'APM & Tracing',
          },
        ],
      },
      {
        label: 'Cloud Monitoring',
        type: 'category',
        isExpanded: false,
        route: '/docs/gcp-monitoring/cloud-monitoring',
        items: [
          {
            type: 'doc',
            route: '/docs/gcp-monitoring/cloud-monitoring/metrics',
            label: 'Metrics',
          },
        ],
      },
    ],
  },
  {
    label: 'Community',
    type: 'category',
    isExpanded: false,
    items: [
      {
        route: '/docs/community/community-integrations',
        type: 'doc',
        label: 'Community Integrations',
      },
      {
        label: 'Community Channels',
        route: '/docs/community',
        type: 'doc',
      },
      {
        route: '/docs/contributing',
        label: 'Contributing Guidelines',
        type: 'doc',
      },
    ],
  },
  {
    label: 'FAQ',
    type: 'category',
    isExpanded: false,
    route: '/docs/faqs',
    // link: {
    // type: 'generated-index',
    // title: 'Frequently Asked Questions',
    // description:
    // 'Find the most commonly questions about SigNoz Installation, Instrumentation, Features, Troubleshooting, and Contributing here:',
    // slug: '/docs/faqs/faq',
    // },
    items: [
      {
        type: 'doc',
        route: '/docs/faqs/general',
        label: 'General - FAQs',
      },
      {
        type: 'doc',
        route: '/docs/faqs/product',
        label: 'Product - FAQs',
      },
      {
        type: 'doc',
        route: '/docs/faqs/troubleshooting',
        label: 'Troubleshooting - FAQs',
      },
      {
        type: 'doc',
        route: '/docs/faqs/instrumentation',
        label: 'Instrumentation - FAQs',
      },
      {
        type: 'doc',
        route: '/docs/faqs/installation',
        label: 'Installation - FAQs',
      },
    ],
  },
]

export default docsSideNav
