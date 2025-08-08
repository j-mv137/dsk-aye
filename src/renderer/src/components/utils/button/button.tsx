import styles from "./button.module.css";
export function Button({
  className,
  children,
  ...props
}: React.ComponentProps<"button">): React.JSX.Element {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
