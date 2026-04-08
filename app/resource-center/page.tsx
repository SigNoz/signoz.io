import React from 'react'
import ResourceCenterClient from './ResourceCenterClient'
import { getResourceCenterBlogs, getResourceCenterGuides } from './content'

export default async function ResourceCenter() {
  return (
    <ResourceCenterClient
      blogPosts={getResourceCenterBlogs()}
      guidePosts={getResourceCenterGuides()}
    />
  )
}
