import { fetchPosts } from '@/lib/posts-gRPC-client'

export default async function Posts() {
  const posts = await fetchPosts()
  return (
    <>
      <h1>Posts</h1>

      {JSON.stringify(posts)}
    </>
  )
}
