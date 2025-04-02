"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageLoading } from '@/components/ui/message-loading'

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
}

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
  isLoading?: boolean
}

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant = "received", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
          variant === "received" && "mr-auto",
          variant === "sent" && "ml-auto flex-row-reverse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatBubble.displayName = "ChatBubble"

const ChatBubbleMessage = React.forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
  ({ className, variant = "received", isLoading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl px-3 py-2 text-sm",
          variant === "received" && "bg-muted",
          variant === "sent" && "bg-primary text-primary-foreground",
          className
        )}
        {...props}
      >
        {isLoading ? <MessageLoading /> : children}
      </div>
    )
  }
)
ChatBubbleMessage.displayName = "ChatBubbleMessage"

const ChatBubbleAvatar = React.forwardRef<HTMLDivElement, ChatBubbleAvatarProps>(
  ({ className, src, fallback, ...props }, ref) => {
    return (
      <Avatar
        ref={ref}
        className={cn("h-6 w-6", className)}
        {...props}
      >
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    )
  }
)
ChatBubbleAvatar.displayName = "ChatBubbleAvatar"

export { ChatBubble, ChatBubbleMessage, ChatBubbleAvatar }

interface ChatBubbleActionProps {
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex items-center gap-1 mt-2", className)}>
      {children}
    </div>
  )
} 