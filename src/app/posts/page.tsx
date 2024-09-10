import DeletePostButton from '@/components/delete-post-button'
import PostUser from '@/components/post-user'
import { fetchPosts, removePost } from '@/lib/posts-gRPC-client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
  Link
} from '@nextui-org/react'
import { Pencil, Trash } from 'lucide-react'

export default async function Posts() {
  const posts = await fetchPosts()
  return (
    <>
      <main className="w-full">
        <h1>Posts</h1>
        <div className="flex w-full justify-end">
          <Button as={Link} color="primary" variant="flat" href="/posts/create">
            Create post
          </Button>
        </div>
        <section className="flex flex-col gap-8 w-full items-center">
          {posts.map((post) => {
            return (
              <Card key={post.id} className="w-1/4">
                <CardHeader>
                  <PostUser id={post.authorId} />
                </CardHeader>
                <Divider />
                <CardBody>
                  <h2 className="font-bold text-lg ">{post.title}</h2>
                  <p>{post.content}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex w-full gap-4 justify-end ">
                  <Tooltip color="primary" content="Modify post">
                    <Button
                      as={Link}
                      isIconOnly
                      color="primary"
                      variant="flat"
                      href={`/posts/${post.id}`}
                    >
                      <Pencil size={20} />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete post">
                    <DeletePostButton id={post.id} />
                  </Tooltip>
                </CardFooter>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
