import { CircleX } from "lucide-react";
import styles from "./selected.module.css";
import { Product } from "@renderer/components/positions/utilsPositions";

interface SelectedProps {
  prods: Product[];
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Selected({
  prods,
  setSelected,
}: SelectedProps): React.JSX.Element {
  return (
    <div className={styles.selectedBackground}>
      <div className={styles.boxCont}>
        <div className={styles.prodsBox}>
          {prods.length > 0 ? (
            prods.map((prod) => (
              <div key={prod.id} className={styles.prodCont}>
                <span className={styles.mainCode}>{prod.mainCode}</span>
                <div>{prod.description}</div>
              </div>
            ))
          ) : (
            <div className={styles.noProdsCont}>
              <span>No se encontraron artículos en esta posición</span>
            </div>
          )}
        </div>
        <CircleX
          color="red"
          strokeWidth={1.8}
          className={styles.crossBtn}
          onClick={() => setSelected(false)}
        />
      </div>
    </div>
  );
}
