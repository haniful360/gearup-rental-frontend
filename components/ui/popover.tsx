import * as React from "react"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

const Popover = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const visible = open !== undefined ? open : isOpen
  const setOpen = (v: boolean) => (open !== undefined ? onOpenChange?.(v) : setIsOpen(v))

  return (
    <PopoverContext.Provider value={{ open: visible, setOpen }}>
      {children}
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button"> & { asChild?: boolean }>(({ asChild, onClick, children, ...props }, ref) => {
  const { setOpen, open } = React.useContext(PopoverContext)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: any) => { setOpen(!open); onClick?.(e) },
    })
  }
  return <button ref={ref} onClick={(e) => { setOpen(!open); onClick?.(e) }} {...props}>{children}</button>
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & { align?: string; sideOffset?: number }>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const { open } = React.useContext(PopoverContext)
  if (!open) return null
  return (
    <div ref={ref} className={cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)} {...props} />
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
