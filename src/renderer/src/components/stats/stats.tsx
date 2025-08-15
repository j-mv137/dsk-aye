import { ContainerDown } from "../utils/layout1";
import styles from "./stats.module.css";

export function Stats(): React.JSX.Element {
  return (
    <ContainerDown>
      <div className={styles.sideBar}>
        <div className={styles.header}>
          <span className={styles.headerTxt}>Reporte de Ventas</span>
        </div>

        <div className={styles.prodsListRow}>
          <span>Productos más vendidos</span>
          <div className={styles.prodsList}></div>
        </div>
      </div>
    </ContainerDown>
  );
}
