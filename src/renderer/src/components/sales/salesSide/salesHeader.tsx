import { Input } from "@renderer/components/utils/input/input";
import { formatSellPrice, getPrice } from "../salesUtils";
import { useSalesStore } from "../salesStore";

import styles from "./salesHeader.module.css";
import { useRef, useState } from "react";
import { Product } from "@renderer/components/positions/utilsPositions";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@renderer/components/utils/dialog/dialog";

interface SalesHeaderProps {
  searchBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export function SalesHeader({
  searchBtnRef,
}: SalesHeaderProps): React.JSX.Element {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const lgInputRef = useRef<HTMLInputElement | null>(null);
  const lastLength = useRef<number>(0);

  const [foundProducts, setFoundProducts] = useState<Product[]>([]);

  const selectedProd = useSalesStore((state) => state.selectedProd);
  const setSelectedProd = useSalesStore((state) => state.setSelectedProd);

  const inputProdSelected = useSalesStore((state) => state.inputProdSelected);
  const setInputProdSelected = useSalesStore(
    (state) => state.setInputProdSelected
  );

  function handleGetProdsBySearch(query: string): void {
    window.electronAPI.getProdsBySearch(query).then((data) => {
      const searchedProds = JSON.parse(data) as Product[];

      setFoundProducts(searchedProds);
    });
  }

  function handleSearchProdsSmInput(query: string): void {
    const currLength = query.split(" ").length;
    if (currLength > lastLength.current && query.includes(" ")) {
      handleGetProdsBySearch(query);

      setInputProdSelected(true);
      lastLength.current = currLength;
    } else if (currLength > 1) {
      lastLength.current = currLength;
      setInputProdSelected(true);
    } else {
      lastLength.current = 0;
      setInputProdSelected(false);
    }
  }

  return (
    <div className={styles.sideHeaderCont}>
      <div className={styles.imgCont}></div>
      <div className={styles.prodInfCont}>
        <div className={styles.prodTxt}>
          <span className={styles.mainCode}>
            {selectedProd?.mainCode.toUpperCase()}
          </span>
          <span>{selectedProd?.secondCode.toUpperCase()}</span>
        </div>
        <div className={styles.lowerHeaderCont}>
          <span>{selectedProd?.description}</span>
          <span>
            <b>
              {selectedProd
                ? `$${formatSellPrice(getPrice(selectedProd))}`
                : ""}
            </b>
          </span>
        </div>

        <div className={styles.searchProdCont}>
          {inputProdSelected && (
            <div className={styles.smSearchCont}>
              {foundProducts.length > 0 ? (
                foundProducts.map((prod) => (
                  <div
                    onClick={() => {
                      setSelectedProd(prod);
                      setInputProdSelected(false);
                    }}
                    key={prod.id}
                    className={styles.searchedProdCont}
                  >
                    <div className={styles.prodTitle}>
                      <span className={styles.searchhMainCode}>
                        {prod.mainCode}
                      </span>
                      <span>{prod.secondCode}</span>
                    </div>
                    {prod.description}
                  </div>
                ))
              ) : (
                <div className={styles.prodsNotFound}>
                  <span>No se encontraron artículos</span>
                </div>
              )}
            </div>
          )}
          <div className={styles.inputCont}>
            <Input
              ref={searchInputRef}
              placeholder="Busca un producto"
              onChange={(e) => {
                handleSearchProdsSmInput(e.target.value);
              }}
            />
            <Dialog
              onOpenChange={(open) => {
                if (!open) setFoundProducts([]);
              }}
            >
              <DialogTrigger asChild>
                <button
                  ref={searchBtnRef}
                  className={styles.searchProdBtn}
                  onClick={() => {
                    if (!searchInputRef.current) return;

                    if (searchInputRef.current.value === "") return;

                    handleGetProdsBySearch(searchInputRef.current.value);

                    setInputProdSelected(true);
                  }}
                >
                  <SearchIcon width={17} opacity={0.7} />
                </button>
              </DialogTrigger>
              {searchInputRef.current?.value === "" && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Productos</DialogTitle>
                  </DialogHeader>
                  <div className={styles.dialogSearhcCont}>
                    <Input ref={lgInputRef} className={styles.longInput} />
                    <button
                      onClick={() => {
                        if (!lgInputRef.current) return;

                        handleGetProdsBySearch(lgInputRef.current.value);
                      }}
                      className={styles.searchProdBtn}
                    >
                      <SearchIcon width={17} opacity={0.7} />
                    </button>
                  </div>
                  <div className={styles.lgProdsCont}>
                    {foundProducts.map((prod) => (
                      <div key={prod.id} className={styles.lgProdItem}>
                        <div className={styles.lgProdTitle}>
                          <div className={styles.codes}>
                            <span className={styles.smMainCode}>
                              {prod.mainCode}
                            </span>
                            <span>{prod.secondCode}</span>
                          </div>
                          {prod.department}
                        </div>
                        {prod.description}
                      </div>
                    ))}
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
