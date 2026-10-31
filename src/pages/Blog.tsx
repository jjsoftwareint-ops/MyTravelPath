import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { blogUpdated } from '../data/blog'
import { formatDate } from '../dates'
import ShareLink from '../components/ShareLink'
import { usePageMeta } from '../seo'

// Title list of the diary. The post a visitor read last carries a "Continue reading" pill.
export default function Blog() {
  usePageMeta()
  return (
    <Layout
      title="Blog"
      subtitle="Stories about Korea"
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
    </Layout>
  )
}
