import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { blogUpdated } from '../data/blog'
import { formatDate } from '../dates'
import { usePageMeta } from '../seo'

// Title list of the diary. The post a visitor read last carries a "Continue reading" pill.
export default function Blog() {
  usePageMeta()
  return (
    <Layout title="Blog" subtitle="A Korea travel diary" backTo="/">
      <div className="blog-wrap">
        <time className="updated blog-updated" dateTime={blogUpdated}>
          Updated {formatDate(blogUpdated)}
        </time>
        <PostList />
        <p className="emoji-credit">Emoji: Fluent Emoji by Microsoft (MIT)</p>
      </div>
    </Layout>
  )
}
