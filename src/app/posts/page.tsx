import PostUser from '@/components/post-user'
import { fetchPosts } from '@/lib/posts-gRPC-client'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from '@nextui-org/react'
import { Pencil, Trash } from 'lucide-react'

export default async function Posts() {
  const posts = await fetchPosts()
  return (
    <>
      <main className="h-full w-full">
        <h1>Posts</h1>

        <section className="flex flex-col h-full w-full items-center">
          {posts.map((post) => {
            return (
              <Card className="w-1/4">
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
                  <Button isIconOnly color="primary" variant="flat">
                    <Pencil size={20} />
                  </Button>
                  <Button isIconOnly color="danger" variant="flat">
                    <Trash size={20} />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
