import styles from "./input.module.css";

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">): React.JSX.Element {
  return <input {...props} className={`${styles.searchInput}  ${className}`} />;
}
