import React from 'react'
import ResourceCenterClient from './ResourceCenterClient'
import { getResourceCenterBlogs, getResourceCenterGuides } from './content'

const blogPosts = getResourceCenterBlogs()
const guidePosts = getResourceCenterGuides()

export default async function ResourceCenter() {
  return <ResourceCenterClient blogPosts={blogPosts} guidePosts={guidePosts} />
}
