// Pure listicle transform functions — no I/O

function transformListicleItem(item, cdnUrl) {
  const transformed = {
    name: item.name,
    href: item.href,
  }

  if (item.clickName) transformed.click_name = item.clickName

  if (item.icon) {
    if (typeof item.icon === 'string') {
      const cleanPath = item.icon.startsWith('/') ? item.icon.slice(1) : item.icon
      transformed.icon_path = `${cdnUrl}/${cleanPath}`
    } else if (typeof item.icon === 'object') {
      if (item.icon.badge) transformed.icon_badge = item.icon.badge
      if (item.icon.color) transformed.icon_color = item.icon.color
    }
  }

  return transformed
}

function transformListicleSubsection(subsection, cdnUrl) {
  const transformed = {
    section_id: subsection.id,
    title: subsection.title,
    section_name: subsection.sectionName,
  }

  if (subsection.gridCols) transformed.grid_cols = subsection.gridCols

  if (subsection.items && subsection.items.length > 0) {
    transformed.items = subsection.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  return transformed
}

function transformListicleSection(section, cdnUrl) {
  const transformed = {
    section_id: section.id,
    label: section.label,
    title: section.title,
    section_name: section.sectionName,
  }

  if (section.gridCols) transformed.grid_cols = section.gridCols

  if (section.items && section.items.length > 0) {
    transformed.items = section.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  if (section.subsections && section.subsections.length > 0) {
    transformed.subsections = section.subsections.map((sub) =>
      transformListicleSubsection(sub, cdnUrl)
    )
  }

  return transformed
}

function transformListicleToStrapi(jsonData, cdnUrl) {
  const transformed = {
    key: jsonData.id,
    pattern: jsonData.pattern,
    markdown_title: jsonData.markdownTitle,
    section_name: jsonData.sectionName,
  }

  if (jsonData.gridCols) transformed.grid_cols = jsonData.gridCols
  if (jsonData.title) transformed.title = jsonData.title
  if (jsonData.description) transformed.description = jsonData.description
  if (jsonData.viewAllHref) transformed.view_all_href = jsonData.viewAllHref
  if (jsonData.viewAllText) transformed.view_all_text = jsonData.viewAllText
  if (jsonData.searchPlaceholder) transformed.search_placeholder = jsonData.searchPlaceholder
  if (jsonData.wrapperTitle) transformed.wrapper_title = jsonData.wrapperTitle

  if (jsonData.items && jsonData.items.length > 0) {
    transformed.items = jsonData.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  if (jsonData.sections && jsonData.sections.length > 0) {
    transformed.sections = jsonData.sections.map((section) =>
      transformListicleSection(section, cdnUrl)
    )
  }

  if (jsonData.staticSections && jsonData.staticSections.length > 0) {
    transformed.static_sections = jsonData.staticSections.map((section) => {
      const s = {
        title: section.title,
        section_name: section.sectionName,
      }
      if (section.gridCols) s.grid_cols = section.gridCols
      if (section.items && section.items.length > 0) {
        s.items = section.items.map((item) => transformListicleItem(item, cdnUrl))
      }
      return s
    })
  }

  return transformed
}

function extractIconPaths(jsonData) {
  const paths = []

  function collectFromItems(items) {
    if (!items) return
    for (const item of items) {
      if (item.icon && typeof item.icon === 'string') {
        paths.push(item.icon)
      }
    }
  }

  collectFromItems(jsonData.items)

  if (jsonData.sections) {
    for (const section of jsonData.sections) {
      collectFromItems(section.items)
      if (section.subsections) {
        for (const sub of section.subsections) {
          collectFromItems(sub.items)
        }
      }
    }
  }

  if (jsonData.staticSections) {
    for (const section of jsonData.staticSections) {
      collectFromItems(section.items)
    }
  }

  return paths
}

module.exports = {
  transformListicleItem,
  transformListicleSubsection,
  transformListicleSection,
  transformListicleToStrapi,
  extractIconPaths,
}
