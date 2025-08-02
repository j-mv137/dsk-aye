import styles from "./layout1.module.css";

export function ContainerDown({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div {...props} className={styles.mainContainer}>
      {children}
    </div>
  );
}
