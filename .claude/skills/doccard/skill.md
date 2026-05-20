---
name: doccard
description: Convert a docs page into a DocCard category landing page with sidebar toggles. Use when the user says "make this a doccard", "doccard with toggles", or "like the User Guides page".
user_invocable: true
---

# DocCard Category Pattern

When the user asks to "make a page a doccard" or "add toggles in the left panel", apply this two-part pattern:

## 1. Sidebar (`constants/docsSideNav.ts`)

Convert the item from a single `type: 'doc'` entry into a `type: 'category'` with child items:

```typescript
// BEFORE
{ type: 'doc', route: '/docs/path/to/page', label: 'Page Title' },

// AFTER
{
  label: 'Page Title',
  type: 'category',
  isExpanded: false,
  route: '/docs/path/to/page',
  items: [
    { type: 'doc', route: '/docs/path/to/child-1', label: 'Child 1' },
    { type: 'doc', route: '/docs/path/to/child-2', label: 'Child 2' },
  ],
},
```

- The `route` on the category points to the landing page MDX
- Each child in `items` is a `type: 'doc'` linking to an individual page
- This creates the expandable toggle in the left sidebar

## 2. Landing page MDX

The landing page uses `<DocCardContainer>` and `<DocCard>` components — one card per child page:

```mdx
<DocCardContainer>

<DocCard
    title="Child 1"
    description="Short description of this child page"
    href="/docs/path/to/child-1"
/>

<DocCard
    title="Child 2"
    description="Short description of this child page"
    href="/docs/path/to/child-2"
/>

</DocCardContainer>
```

## Key rules

- **"Toggles"** means the sidebar expand/collapse category — NOT `<details>/<summary>` HTML elements
- Every `href` in a DocCard must have a matching `route` entry in the sidebar `items` array
- The landing page MDX should have minimal text (just a one-liner intro) followed by DocCards
- Keep `doc_type: explanation` in the landing page frontmatter

## Checklist

1. Read the current sidebar entry and the MDX file
2. Identify the child pages (from links, content sections, or user instructions)
3. Update `docsSideNav.ts`: convert to category, add child items
4. Update (or create) the landing page MDX with `<DocCardContainer>` + `<DocCard>` entries
5. Verify each child route exists as an actual MDX file
6. Run `yarn check:doc-redirects` to confirm no broken routes
