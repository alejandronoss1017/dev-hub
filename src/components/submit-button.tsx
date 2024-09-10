'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps
  extends Omit<ButtonProps, 'type' | 'isLoading' | 'aria-disabled'> {}
export function SubmitButton({ ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <Button
        type="submit"
        aria-disabled={pending}
        isLoading={pending}
        {...props}
      >
        {props.children}
      </Button>
    </>
  )
}
