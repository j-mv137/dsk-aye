import styles from "./layout1.module.css";

export function ContainerDown({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div {...props} className={`${styles.mainContainer} ${className}`}>
      {children}
    </div>
  );
}
