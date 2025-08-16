import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import styles from "./dialog.module.css";

export function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>): React.JSX.Element {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.JSX.Element {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>): React.JSX.Element {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>): React.JSX.Element {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={`${styles.dialogOverlay} ${className}`}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}): React.JSX.Element {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={`${styles.dialogContent} ${className}`}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={styles.dialogClose}
          >
            <XIcon />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="dialog-header"
      className={`${styles.dialogHeader} ${className}`}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="dialog-footer"
      className={`${styles.dialogFooter} ${className}`}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={`${styles.dialogTitle} ${className}`}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<
  typeof DialogPrimitive.Description
>): React.JSX.Element {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={`${styles.DialogDescription} ${className}`}
      {...props}
    />
  );
}
