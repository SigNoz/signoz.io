
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Get Started',
      items: [
        {
          id: "introduction",
          type: "doc",
          label: 'What is SigNoz ?'
        },
        {
          type: 'category',
          label: 'Installation',
          link: {
            type: 'generated-index',
            title: 'Install SigNoz',
            description: 'To install SigNoz, follow the instructions in the sections below. If you don\'t want to self-host, try SigNoz Cloud.',
            slug: '/install',
          },
          items: [
            {
              type: 'doc',
              id: 'install/cloud',
              label: 'Setup SigNoz Cloud',
            },
            {
              type: 'category',
              label: 'Self-Host SigNoz',
              items: [
                "install/docker-standalone",
                'install/docker-swarm',
                {
                  type: 'category',
                  label: 'Kubernetes',
                  link: {
                    type: 'generated-index',
                    title: 'Kubernetes',
                    description: 'Learn how to install SigNoz on Kubernetes with Helm',
                    slug: '/install/kubernetes',
                  },
                  items: [
                    'install/kubernetes/aws',
                    'install/kubernetes/gcp',
                    {
                      id: 'install/kubernetes/others',
                      type: 'doc',
                      label: 'Other Platform',
                    },
                  ]
                },
                'install/troubleshooting',
              ],
            },
            {
              type: 'category',
              label: 'Install OTel collector',
              items: [
                {
                  id: 'tutorial/opentelemetry-binary-usage-in-virtual-machine',
                  type: 'doc',
                  label: 'VM',
                },
                {
                  id: 'tutorial/kubernetes-infra-metrics',
                  type: 'doc',
                  label: 'Kubernetes',
                },
              ]
            },
          ],
        },
      ],
    },
    {
      label: "SigNoz Features",
      type: "category",
      items: [
        {
          type: 'doc',
          id: 'product-features/saved-view',
          label: 'Saved View',
          className: 'new-doc', // Add this line
        },
        {
          type: 'doc',
          id: 'product-features/query-builder',
          label: 'Query Builder',
        },

      ]
    },
    {
      label: "APM & Distributed Tracing",
      type: "category",
      items: [
        {
          type: 'doc',
          id: 'instrumentation/overview',
          label: 'Get Started',
        },
        {
          label: "Instrument Application",
          type: "category",
          link: {
            type: 'generated-index',
            title: 'Instrument your Application',
            description: 'To instrument your applications and send data to SigNoz, follow the instructions in the sections below.',
            slug: '/instrumentation',
          },
          items: [
            {
              type: 'category',
              label: 'Python',
              link: {
                type: 'doc',
                id: 'instrumentation/python'
                // title: 'Python',
                // description: 'Learn how to instrument Python applications with OpenTelemetry',
                // slug: 'instrumentation/python',
              },
              items: [
                'instrumentation/django',
                'instrumentation/fastapi',
                'instrumentation/flask',
                'instrumentation/falcon',
              ]
            },
            {
              type: 'category',
              label: 'Java',
              link: {
                type: 'doc',
                id: 'instrumentation/java'
                // title: 'Python',
                // description: 'Learn how to instrument Python applications with OpenTelemetry',
                // slug: 'instrumentation/python',
              },
              items: [
                'instrumentation/springboot',
                'instrumentation/tomcat',
                'instrumentation/jboss',
              ]
            },
            {
              type: 'category',
              label: 'Javascript',
              link: {
                type: 'doc',
                id: 'instrumentation/javascript'
                // title: 'Python',
                // description: 'Learn how to instrument Python applications with OpenTelemetry',
                // slug: 'instrumentation/python',
              },
              items: [
                'instrumentation/express',
                'instrumentation/nestjs',
                'instrumentation/angular',
              ]
            },
            {
              type: 'doc',
              label: 'Golang',
              id: 'instrumentation/golang',
            },
            {
              type: 'doc',
              label: 'PHP',
              id: 'instrumentation/php',
            },
            {
              type: 'doc',
              label: '.NET',
              id: 'instrumentation/dotnet',
            },
            {
              type: 'doc',
              label: 'Ruby on Rails',
              id: 'instrumentation/ruby-on-rails',
            },
            {
              type: 'doc',
              label: 'Elixir',
              id: 'instrumentation/elixir',
            },
            {
              type: 'doc',
              label: 'Rust',
              id: 'instrumentation/rust',
            },
            {
              type: 'doc',
              label: 'Swift',
              id: 'instrumentation/swift',
            },
          ],
        },
        {
          type: "category",
          label: "APM Product Overview",
          items: [
            {
              type: 'doc',
              label: 'ClickHouse Queries for Traces',
              id: 'userguide/metrics',
            },
            {
              type: 'category',
              label: 'View Traces',
              link: {
                type: 'doc',
                id: 'userguide/traces',
              },
              items: [
                'userguide/span-details',
              ]
            },
            {
              type: 'doc',
              id: 'userguide/service-map',

            },
          ]
        },
        {
          type: "category",
          label: "Trace API",
          items: [
            {
              type: "doc",
              id: 'traces-management/trace-api/overview',
              label: 'Overview',
            },
            {
              type: 'doc',
              id: "traces-management/trace-api/payload-model",
              label: 'Payload Model',
            },
            {
              type: 'doc',
              id: "traces-management/trace-api/search-traces",
              label: 'Search Traces',
            },
            {
              type: 'doc',
              id: "traces-management/trace-api/aggregate-traces",
              label: 'Aggregate Traces',
            },
          ]
        },
        {
          type: "category",
          label: "Tutorials",
          items: [
            {
              type: 'doc',
              label: 'ClickHouse Queries for Traces',
              id: 'userguide/writing-clickhouse-traces-query',
            },
            {
              type: 'doc',
              id: 'application-monitoring/api-monitoring',
              label: 'API Monitoring',
            },
          ]
        },
        {
          type: 'doc',
          id: 'instrumentation/troubleshoot-instrumentation',
          label: 'Troubleshooting',
        },

      ],
    },
    {
      label: "Infrastructure Monitoring",
      type: "category",
      items: [
        'userguide/send-metrics-cloud',
        'userguide/send-metrics',
        'userguide/drop-metrics',
        'userguide/navigate-user-interface',
        'userguide/hostmetrics',
        {
          type: 'doc',
          id: 'userguide/collecting-ecs-logs-and-metrics',
          label: 'ECS Infra Metrics & Logs',
        },
        {
          type: 'doc',
          id: 'userguide/collecting-ecs-sidecar-infra',
          label: 'ECS Infra Sidecar',
        }
      ],
    },
    {
      label: "Logs Management",
      type: "category",
      items: [
        {
          type: 'doc',
          id: 'userguide/logs',
          label: 'Get Started',
        },
        {
          type: 'category',
          label: 'Send Logs to SigNoz',
          items: [
            {
              type: 'doc',
              id: 'userguide/collect_kubernetes_pod_logs',
              label: 'Kubernetes pod logs',
            }, {
              type: 'doc',
              id: 'userguide/collect_docker_logs',
              label: 'Docker logs',
            }, {
              type: 'doc',
              id: 'userguide/heroku_logs_to_signoz',
              label: 'Heroku logs',
            },
            {
              type: 'doc',
              id: 'userguide/vercel_logs_to_signoz',
              label: 'Vercel logs',
            },
            {
              type: 'doc',
              id: 'userguide/send-logs-http',
              label: 'HTTP logs',
            },
            {
              type: 'doc',
              id: 'userguide/collecting_syslogs',
              label: 'Syslogs',
            },
            {
              type: 'category',
              label: 'Application Logs',
              items: [
                {
                  type: 'doc',
                  id: 'userguide/collect_logs_from_file',
                  label: 'From Log File',
                },
                {
                  type: 'doc',
                  id: 'userguide/collecting_application_logs_otel_sdk_python',
                  label: 'Using OTel Python SDK',
                },
                {
                  type: 'doc',
                  id: 'userguide/collecting_application_logs_otel_sdk_java',
                  label: 'Using OTel Java SDK'
                },
              ],
            },
            {
              type: 'doc',
              id: 'userguide/collecting_nodejs_winston_logs',
              label: 'NodeJS Winston logs',
            },
            {
              type: 'doc',
              id: 'userguide/send-cloudwatch-logs-to-signoz',
              label: 'Cloudwatch logs',
            },
            {
              type: 'category',
              label: 'Existing Collectors to SigNoz',
              items: [
                'userguide/fluentbit_to_signoz',
                'userguide/fluentd_to_signoz',
                'userguide/logstash_to_signoz',
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Preprocess Logs",
          link: {
            type: "doc",
            id: "logs-pipelines/introduction",
          }, items: [
            "logs-pipelines/concepts",
            "logs-pipelines/processors",
            {
              type: "category",
              label: "Guides",
              link: {
                type: "generated-index",
                title: "Logs Pipeline Guides",
                description: 'See these guides for detailed walkthroughs on creating Log Pipelines for specific purposes.',
              },
              items: [
                "logs-pipelines/guides/json",
                "logs-pipelines/guides/trace"
              ]
            }
          ]
        },
        {
          type: "category",
          label: "Features",
          items: [
            'userguide/logs_fields',
            'userguide/logs_query_builder',
          ]
        },
        {
          type: 'doc',
          id: 'userguide/logs_clickhouse_queries',
          label: 'ClickHouse Queries for Logs',
        },
        {
          type: "category",
          label: "Logs API",
          items: [
            {
              type: "doc",
              id: 'logs-management/logs-api/overview',
              label: 'Overview',
            },
            {
              type: 'doc',
              id: "logs-management/logs-api/payload-model",
              label: 'Payload Model',
            },
            {
              type: 'doc',
              id: "logs-management/logs-api/search-logs",
              label: 'Search Logs',
            },
            {
              type: 'doc',
              id: "logs-management/logs-api/aggregate-logs",
              label: 'Aggregate Logs',
            },
            {
              type: 'doc',
              id: "logs-management/logs-api/logs-url-for-explorer-page",
              label: 'Logs URL for Explorer',
            },
          ]
        },
        'userguide/logs_troubleshooting',
      ],
    },
    {
      label: "Dashboards & Querying",
      type: "category",
      items: [
        {
          type: 'doc',
          id: 'userguide/manage-dashboards-and-panels',
          label: 'Get Started',
        },
        'userguide/manage-dashboards',
        'userguide/manage-panels',
        'userguide/manage-variables',
        'userguide/create-a-custom-query',
        {
          type: 'doc',
          id: 'userguide/query-builder',

        },
        {
          type: 'doc',
          id: 'userguide/write-a-metrics-clickhouse-query',
          label: 'ClickHouse Query for Metrics',
        },
      ]
    },

    {
      label: "Alerts",
      type: "category",
      link: {
          type: "generated-index",
          title: "Alert Management in SigNoz",
          description: 'This documentation helps you in understanding the Alerts feature in SigNoz and how you can create different types of alerts.',
          slug: '/alerts',
      },
      items: [
        {
          type: 'doc',
          id: 'userguide/alerts-management',
          label: 'Alert Management',
        },
        // {
        //   type: 'doc',
        //   id: 'product-features/alerts/alerts-notification-channel',
        //   label: 'Notification Channel',
        // },
        {
          label: "Setup Alerts Notification",
          type: "category",
          link: {
            type: "generated-index",
            title: "Setup Alerts Notifications Channel",
            description: 'You can setup notification channel for sending the generated alerts to other applications. Currently, the following channels are supported.',
            slug: '/setup-alerts-notification',
            // type: "doc",
            // id: "product-features/alerts/alerts-notification-channel",
          },
          items: [
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/slack',
              label: 'Slack',
            },
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/webhook',
              label: 'Webhook',
            },
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/pagerduty',
              label: 'PagerDuty',
            },
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/opsgenie',
              label: 'Opsgenie',
            },
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/ms-teams',
              label: 'MS Teams',
            },
            {
              type: 'doc',
              id: 'alerts-management/notification-channel/email',
              label: 'Email',
            },
          ],
        },
        {
          type: 'doc',
          id: 'alerts-management/metrics-based-alerts',
          label: 'Metrics based Alert',
        },
        {
          type: 'doc',
          id: 'alerts-management/log-based-alerts',
          label: 'Log based Alert',
        },
        {
          type: 'doc',
          id: 'alerts-management/trace-based-alerts',
          label: 'Trace based Alert',
        },
        {
          type: 'doc',
          id: 'alerts-management/exceptions-based-alerts',
          label: 'Exceptions based Alert',
        },
      ],
    },

    {
      type: 'doc',
      id: 'monitor-http-endpoints',
      label: 'Monitor HTTP Endpoints',
    },
    {
      type: 'doc',
      id: 'userguide/exceptions',
      label: 'Monitroing Exceptions',
    },
    {
      label: "Security & Compliance",
      type: "category",
      items: [
        //     'userguide/overview',
        'userguide/authentication',
        'userguide/sso-authentication',
        'userguide/retention-period',
        'userguide/otlp-http-enable-cors',
      ],
    },
    {
      label: "Tutorials",
      type: "category",
      link: {
        type: 'generated-index',
        title: 'Tutorials',
        description: 'SigNoz tutorials are step-by-step training exercises that guide you through monitoring your applications and infrastructure.',
        slug: '/tutorials',
      },
      items: [
        'tutorial/jvm-metrics',
        'tutorial/jmx-metrics',
        'tutorial/mongodb-metrics',
        'tutorial/instrumenting-angular-frontend',
        'tutorial/s3-integration-iam-role-eks',
        'tutorial/oci-bucket-cold-storage-integration',
        'tutorial/opentelemetry-operator-usage',
        'tutorial/setting-up-tls-for-signoz',
        'tutorial/setting-up-sso-saml-with-keycloak',
        'tutorial/writing-clickhouse-queries-in-dashboard',
        'tutorial/traefik-observability',
      ],
    },
    {
      label: "AWS Monitoring",
      type: "category",
      items: [
        //'aws/getting-started',
        {
          type: 'category',
          label: 'EC2',
          link: {
            type: 'generated-index',
            title: 'EC2 Monitoring',
            slug: '/ec2-monitoring',
          },
          items: [
            {
              type: 'doc',
              id: 'aws-monitoring/ec2-logs',
              label: 'Application/Server logs'
    
            },
            {
              type: 'doc',
              id: 'aws-monitoring/ec2-infra-metrics',
              label: 'Infrastructure Metrics'
    
            },
          ]
        },
        {
          type: 'category',
          label: 'ECS',
          link: {
            type: 'generated-index',
            title: 'ECS Monitoring',
            slug: '/ecs-monitoring',
          },
          items: [
            {
              type: 'doc',
              id: 'aws-monitoring/ecs-ec2-external',
              label: 'EC2/External'
    
            },
            {
              type: 'doc',
              id: 'aws-monitoring/ecs-fargate',
              label: 'Fargate'
    
            },
          ]
        },
        {
          type: 'doc',
          id: 'aws-monitoring/elb-logs',
          label: 'ELB',
        },
        {
          type: 'doc',
          id: 'aws-monitoring/vpc-logs',
          label: 'VPC',
        },
        {
          type: 'doc',
          id: 'aws-monitoring/rds-logs',
          label: 'RDS',
        },
        {
          type: 'doc',
          id: 'aws-monitoring/lambda-logs',
          label: 'AWS Lambda',
        },
      ],
    },
    {
      type: 'category',
      label: 'Operate Self-Hosted SigNoz',
      link: {
        type: 'generated-index',
        title: 'Operate',
        description: 'The following sections provide an overview of the activities that are required to successfully operate SigNoz. Based on your environment, proceed to one of the sections below.',
        slug: '/operate',
      },
      items: [
        'operate/configuration',
        'operate/docker-standalone',
        'operate/docker-swarm',
        'operate/kubernetes',
        {
          type: 'category',
          label: 'Migration Guides',
          link: {
            type: 'generated-index',
            title: 'Migration Guides',
            description: 'The following sections provide instructions to migrate SigNoz components across newer versions. You need to run these migration scripts step by step. For example if you are currently on `0.8.2` and want to migrate to `0.10.0` - you need to run migration script for `0.9` first and then `0.10`',
            slug: '/operate/migration',
          },
          items: [
            'operate/migration/upgrade-0.8.0',
            'operate/migration/upgrade-0.8.1',
            'operate/migration/upgrade-0.9',
            'operate/migration/upgrade-0.10',
            'operate/migration/upgrade-0.12',
            'operate/migration/upgrade-0.19',
            'operate/migration/upgrade-0.23',
            'operate/migration/upgrade-0.27',
            'operate/migration/upgrade-0.36',
            'operate/migration/upgrade-0.38',
          ]
        },
        {
          type: 'category',
          label: 'ClickHouse',
          link: {
            type: 'generated-index',
            title: 'ClickHouse',
            description: 'The following sections provide instructions to operate ClickHouse. Based on your environment, proceed to one of the sections below.',
            slug: '/operate/clickhouse',
          },
          items: [
            'operate/clickhouse/increase-clickhouse-pv',
            'operate/clickhouse/connect-to-clickhouse',
            'operate/clickhouse/distributed-clickhouse',
            'operate/clickhouse/external-clickhouse',
          ]
        },
        {
          type: 'category',
          label: 'SQLite',
          link: {
            type: 'generated-index',
            title: 'SQLite',
            description: 'The following sections provide instructions to operate SQLite. You can proceed to one of the sections below.',
            slug: '/operate/sqlite',
          },
          items: [
            'operate/sqlite/reset-admin-password',
          ]
        },
        'operate/feature-flags',
        {
          id: "production-readiness",
          type: "doc",
        },
      ],
    },
    {
      type: "category",
      label: "About SigNoz",
      items: [
        {
          id: "architecture",
          type: "doc",
        },
        {
          id: "contributing",
          type: "doc",
        },
        {
          id: "roadmap",
          type: "doc",
        },
        // 'about-signoz/architecture',
        // 'about-signoz/contributing',
        // 'about-signoz/roadmap',
      ]
    },
    {
      id: "community",
      type: "doc",
    },
    {
      label: "FAQ",
      type: "category",
      link: {
        type: 'generated-index',
        title: 'Frequently Asked Questions',
        description: 'Find the most commonly questions about SigNoz Installation, Instrumentation, Features, Troubleshooting, and Contributing here:',
        slug: '/faq',
      },
      items: [
        'faqs/product',
        'faqs/troubleshooting',
        'faqs/instrumentation',
        'faqs/installation',
      ],
    },

    {
      label: "Others",
      type: "category",
      items: [
        'telemetry',
      ],
    },
  ]
}
