import { useEffect } from 'react'
import InstallButton from '../components/InstallButton'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { blogUpdated } from '../data/blog'
import { formatDate } from '../dates'
import ShareLink from '../components/ShareLink'
import { markBlogSeen } from '../newPosts'
import { usePageMeta } from '../seo'

// Title list of the diary. The post a visitor read last carries a "Continue reading" pill,
// posts since their last look here a "New" pill (opening the list marks them seen).
export default function Blog() {
  usePageMeta()
  useEffect(() => markBlogSeen(), [])
  return (
    <Layout
      title="Blog"
      subtitle="Stories about Korea"
      blogTheme
      backTo="/"
      noSaved
      actions={<ShareLink compact title="My Travel Path Blog" text="Stories about Korea, on My Travel Path" />}
    >
      <div className="blog-wrap">
        <time className="updated blog-updated" dateTime={blogUpdated}>
          Updated {formatDate(blogUpdated)}
        </time>
        <PostList />
        <p className="emoji-credit">Emoji: OpenMoji (CC BY-SA 4.0)</p>
      </div>
      <InstallButton />
    </Layout>
  )
}
