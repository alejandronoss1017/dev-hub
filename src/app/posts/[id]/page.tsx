import { SubmitButton } from '@/components/submit-button'
import { fetchPost, updatePost } from '@/lib/posts-gRPC-client'
import { Button, Input, Link, Textarea } from '@nextui-org/react'

export default async function Post({ params }: { params: { id: number } }) {
  const post = await fetchPost(params.id)

  return (
    <>
      <form className="h-full flex flex-col gap-4 w-1/2">
        <Input
          isReadOnly
          defaultValue={post.id.toString()}
          value={post.id.toString()}
          name="id"
          label="Id"
          type="number"
          variant="bordered"
        />
        <Input
          defaultValue={post.title}
          name="title"
          isRequired
          label="Title"
          description="Enter the post title"
          type="text"
          variant="bordered"
        />
        <Textarea
          defaultValue={post.content}
          name="content"
          isRequired
          label="Content"
          description="Enter the post content"
          type="text"
          variant="bordered"
        />
        <span className="flex gap-4 justify-end">
          <Button as={Link} variant="flat" color="danger" href="/posts">
            Cancel
          </Button>
          <SubmitButton formAction={updatePost} variant="flat" color="primary">
            Submit
          </SubmitButton>
        </span>
      </form>
    </>
  )
}
