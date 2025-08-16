import {
  SelectScrollDownButton,
  SelectScrollUpButton,
} from "@radix-ui/react-select";
import styles from "./select.module.css";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

export function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>): React.JSX.Element {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>): React.JSX.Element {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>): React.JSX.Element {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}): React.JSX.Element {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={`${styles.selectTrigger} ${className}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon size={20} strokeWidth={1.5} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>): React.JSX.Element {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={`${styles.selectContent} ${className}`}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={styles.vp}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>): React.JSX.Element {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={`${styles.selectLabel} ${className}`}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>): React.JSX.Element {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={`${styles.selectItem} ${className}`}
      {...props}
    >
      <SelectPrimitive.ItemText className={styles.itemText}>
        {children}
      </SelectPrimitive.ItemText>
      <span>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
