import { useMemo, useRef, useState } from "react";
import styles from "./searchProds.module.css";
import { Input } from "@renderer/components/utils/input/input";
import {
  CirclePlus,
  CircleX,
  FileQuestionMark,
  SearchIcon,
} from "lucide-react";
import { TableShowPos } from "./showPosTable/tableShowPos";
import { colsSPT } from "./showPosTable/showPos";
import { capitalizeFirst, Position, Product } from "../utilsPositions";
import { usePositionsStore } from "../positionStore";
import { TablePrevAdd } from "./prevToAddTable/tablePrevAdd";

export function SearchProds(): React.JSX.Element {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [text, setText] = useState("");
  const [prods, setProds] = useState<Product[]>([]);
  const [selectedProd, setSelectedProd] = useState<number>(NaN);

  const [posForProd, setPosForProd] = useState<Position[]>([]);

  const addPosState = usePositionsStore((state) => state.addPosState);
  const setAddPosState = usePositionsStore((state) => state.setAddPosState);
  const prevToAddPos = usePositionsStore((state) => state.prevToAddPos);
  const clearPrevPos = usePositionsStore((state) => state.clearPrevPos);
  const clearReadyPos = usePositionsStore((state) => state.clearReadyPos);
  const readyPos = usePositionsStore((state) => state.readyPos);
  const popReadyPos = usePositionsStore((state) => state.popReadyPos);
  const popPrevPos = usePositionsStore((state) => state.popPrevPos);

  function handleSearch(): void {
    if (!searchInputRef.current) return;
    window.electronAPI
      .getProdsBySearch(searchInputRef.current.value)
      .then()
      .then((data) => {
        setProds(JSON.parse(data));
      });
  }

  function handleSelectProd(prodId: number): void {
    window.electronAPI
      .getPosForProd(prodId)
      .then((res) => {
        const positions = JSON.parse(res) as Position[];

        setPosForProd(positions);
        setSelectedProd(prodId);
      })
      .catch((err) => {
        // TODO: trigger toast or however it's called

        console.log(err);
      });

    {
      /* Reset the previous to add positions */
    }
    clearPrevPos();
    clearReadyPos();
    setAddPosState(false);
  }

  function handleAddPosForProd(prodId: number): void {
    readyPos.forEach((pos) => {
      window.electronAPI.addPosToProd(prodId, JSON.stringify(pos));
    });

    clearReadyPos();
    clearPrevPos();
  }

  // So the input element doesn't refresh every time the map gets adjusted
  const input = useMemo(() => {
    return (
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={searchInputRef}
        className={styles.searchInput2}
      />
    );
  }, [text]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        {input}
        <div className={styles.searchIconContainer} onClick={handleSearch}>
          <SearchIcon width={17} opacity={0.7} />
        </div>
      </div>
      <div className={styles.itemsContainer}>
        {(!prods || prods.length === 0) && (
          <div className={styles.notFoundContainer}>
            <div className={styles.notFoundContent}>
              <FileQuestionMark width="auto" height={100} />
              <span>No se encontraron artículos</span>
            </div>
          </div>
        )}
        {prods?.map((prod) =>
          selectedProd !== prod.id ? (
            <div
              key={prod.id}
              className={styles.item}
              onClick={() => {
                handleSelectProd(prod.id);
              }}
            >
              <div className={styles.itemContent}>
                <div className={styles.codes}>
                  <span>{prod.mainCode}</span>
                  <span>{prod.secondCode}</span>
                </div>
                <span>{capitalizeFirst(prod.description)}</span>
              </div>
            </div>
          ) : (
            // Selected prod item
            <div key={prod.mainCode} className={styles.selectedItem}>
              <div className={styles.selectedItemContent}>
                <div className={styles.codes}>
                  <span>{prod.mainCode}</span>
                  <span>{prod.secondCode}</span>
                </div>
                <span>{capitalizeFirst(prod.description)}</span>
              </div>

              <div className={styles.showPosCont}>
                <TableShowPos columns={colsSPT} data={posForProd} />

                {/* Previous to add positions table */}
                {prevToAddPos.length != 0 && (
                  <TablePrevAdd data={prevToAddPos} />
                )}

                {/* Buttons */}
                <div className={styles.buttonCont}>
                  {addPosState && (
                    <span className={styles.instLabel}>
                      Selecciona una elemento en el mapa para añadir una
                      posición para el producto
                    </span>
                  )}
                  {!addPosState ? (
                    <button
                      className={styles.addBtn}
                      onClick={() => {
                        setAddPosState(true);
                      }}
                    >
                      <span>Añadir</span>
                      <CirclePlus size={18} />
                    </button>
                  ) : (
                    <div className={styles.confirmAddCont}>
                      <button
                        onClick={() => handleAddPosForProd(prod.id)}
                        className={styles.addBtn}
                      >
                        <span>Confirmar</span>
                        <CirclePlus size={18} />
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => {
                          if (prevToAddPos.length === 0) setAddPosState(false);
                          popPrevPos();
                          popReadyPos();
                        }}
                      >
                        <span>Cancelar</span>
                        <CircleX size={18} color="white" strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
