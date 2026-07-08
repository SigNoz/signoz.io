// Strapi Collection Type Schemas — pure data, no logic

// URL prefix to Strapi endpoint/content_type mapping for related_articles component
const RELATED_ARTICLE_TYPE_MAP = {
  docs: { endpoint: 'docs', content_type: 'doc' },
  guides: { endpoint: 'guides', content_type: 'guide' },
  comparisons: { endpoint: 'comparisons', content_type: 'comparison' },
  blog: { endpoint: 'blogs', content_type: 'blog' },
  faqs: { endpoint: 'faqs', content_type: 'faq' },
  opentelemetry: { endpoint: 'opentelemetries', content_type: 'opentelemetry' },
  'case-study': { endpoint: 'case-studies', content_type: 'case_study' },
}

const COLLECTION_SCHEMAS = {
  faqs: {
    apiPath: 'api::faq.faq',
    endpoint: 'faqs',
    fields: [
      'title',
      'description',
      'date',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  'case-study': {
    apiPath: 'api::case-study.case-study',
    endpoint: 'case-studies',
    fields: [
      'title',
      'description',
      'image',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
    },
  },
  comparisons: {
    apiPath: 'api::comparison.comparison',
    endpoint: 'comparisons',
    fields: [
      'title',
      'description',
      'image',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  guides: {
    apiPath: 'api::guide.guide',
    endpoint: 'guides',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  opentelemetry: {
    apiPath: 'api::opentelemetry.opentelemetry',
    endpoint: 'opentelemetries',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  blog: {
    apiPath: 'api::blog.blog',
    endpoint: 'blogs',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
      'is_newsroom',
      'hide_table_of_contents',
      'excludeFromSitemap',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  docs: {
    apiPath: 'api::doc.doc',
    endpoint: 'docs',
    fields: ['title', 'path', 'content', 'deployment_status'],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  authors: {
    apiPath: 'api::author.author',
    endpoint: 'authors',
    fields: ['key', 'name', 'title', 'url', 'image_url'],
  },
  tags: {
    apiPath: 'api::tag.tag',
    endpoint: 'tags',
    fields: ['value', 'key', 'description'],
  },
  keywords: {
    apiPath: 'api::keyword.keyword',
    endpoint: 'keywords',
    fields: ['value', 'key', 'description'],
  },
}

function getSchemaForFolder(name) {
  return COLLECTION_SCHEMAS[name] || null
}

module.exports = { COLLECTION_SCHEMAS, RELATED_ARTICLE_TYPE_MAP, getSchemaForFolder }
