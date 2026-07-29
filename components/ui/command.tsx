import * as React from "react"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & { shouldFilter?: boolean }>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)} {...props} />
))
Command.displayName = "Command"

const CommandInput = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input"> & { onValueChange?: (v: string) => void }>(({ className, onValueChange, onChange, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <input ref={ref} className={cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
  </div>
))
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />
))
CommandList.displayName = "CommandList"

const CommandItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & { selected?: boolean }>(({ className, selected, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer", className)} {...props} />
))
CommandItem.displayName = "CommandItem"

const CommandGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className)} {...props} />
))
CommandGroup.displayName = "CommandGroup"

const CommandEmpty = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-6 text-center text-sm", className)} {...props} />
))
CommandEmpty.displayName = "CommandEmpty"

export { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty }
