import { useEffect } from 'react'
import InstallButton from '../components/InstallButton'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { blogUpdated } from '../data/blog'
import { formatDate } from '../dates'
import ShareLink from '../components/ShareLink'
import { markBlogSeen } from '../newPosts'
import { usePageMeta } from '../seo'

// The blog list's back button steps past every blog page (the posts read from here, the list itself) to the
// page the reader came from, such as a path page or home.
const isBlogPage = (path: string) => path === '/blog' || path.startsWith('/blog/')

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
      backSkip={isBlogPage}
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
