import styles from "./layout1.module.css";

export function ContainerDown({
  children,
}: {
  children: React.JSX.Element;
}): React.JSX.Element {
  return <div className={styles.mainContainer}>{children}</div>;
}
