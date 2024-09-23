import { SubmitButton } from '@/components/submit-button'
import { createPost } from '@/lib/posts-gRPC-client'
import { Button, Input, Link, Textarea } from '@nextui-org/react'

export default function CreatePost() {
  return (
    <>
      <main className="flex flex-col w-full h-full gap-8 items-center">
        <h1>Create post</h1>
        <form className=" h-full flex flex-col gap-4 w-1/2">
          <Input
            name="authorId"
            isRequired
            label="Author ID"
            description="Enter the author ID"
            type="number"
            variant="bordered"
          />
          <Input
            name="title"
            isRequired
            label="Title"
            description="Enter the post title"
            type="text"
            variant="bordered"
          />
          <Textarea
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
            <SubmitButton
              formAction={createPost}
              variant="flat"
              color="primary"
            >
              Submit
            </SubmitButton>
          </span>
        </form>
      </main>
    </>
  )
}
