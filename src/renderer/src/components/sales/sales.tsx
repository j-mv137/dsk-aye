import { useRef } from "react";
import { ContainerDown } from "../utils/layout1";
import styles from "./sales.module.css";
import { useSalesStore } from "./salesStore";
import { SalesHeader } from "./salesSide/salesHeader";
import { ClientDialog } from "./salesSide/utils/clientDialog";
import { TypeSelect } from "./salesSide/utils/typeSelect";
import { Button } from "../utils/button/button";
import { SelectContent, SelectGroup, SelectItem } from "../utils/select/select";
import { SALE_TYPE, SALESMEN } from "./salesUtils";
export function Sales(): React.JSX.Element {
  const searchBtnRef = useRef<null | HTMLButtonElement>(null);

  const setInputProdSelected = useSalesStore(
    (state) => state.setInputProdSelected
  );

  return (
    <ContainerDown
      onKeyDown={(e) => {
        if (e.key === "Enter") searchBtnRef.current?.click();
      }}
    >
      <div className={styles.sideCont}>
        {/* HEADER */}
        <SalesHeader searchBtnRef={searchBtnRef} />

        {/* CLIENT & TYPE */}
        <div
          className={styles.sideClTyCont}
          onClick={() => {
            setInputProdSelected(false);
          }}
        >
          <div className={styles.clientCont}>
            <ClientDialog />
          </div>
          <div className={styles.clientCont}>
            <TypeSelect placeholder="Tipo de Nota">
              <SelectContent>
                <SelectGroup>
                  {SALE_TYPE.map((saleType) => (
                    <SelectItem key={saleType.label} value={saleType.label}>
                      {saleType.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </TypeSelect>
          </div>
        </div>

        {/* OPTIONS */}
        <div className={styles.optionsGrid}>
          <div className={styles.option}>Importar Cotización</div>
          <div className={styles.option}>Aplicar Nota de Crédito</div>
          <div className={styles.option}>Artículo Rápido</div>
          <div className={styles.option}>Abrir Caja</div>
          <div className={styles.option}></div>
        </div>

        <div className={styles.lastRow}>
          <div className={styles.lastRowCont}>
            <TypeSelect placeholder="Vendedor">
              <SelectContent>
                <SelectGroup>
                  {SALESMEN.map((salesMan) => (
                    <SelectItem key={salesMan.name} value={salesMan.name}>
                      {salesMan.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </TypeSelect>
          </div>
          <div className={styles.lastBtnCont}>
            <Button className={styles.finishBtn}>Finalizar</Button>
          </div>
        </div>
      </div>

      {/* DISPLAY PRODS. */}
      <div className={styles.prodsCont}>
        <div className={styles.prodRow}></div>
      </div>
    </ContainerDown>
  );
}
