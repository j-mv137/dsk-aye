import { useMemo, useRef, useState } from "react";
import styles from "./searchProds.module.css";
import { Input } from "@renderer/components/utils/input/input";
import { FileQuestionMark, SearchIcon } from "lucide-react";
import { capitalizeFirst, Product } from "../positions";

export function SearchProds(): React.JSX.Element {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [text, setText] = useState("");
  const [prods, setProds] = useState<Product[]>([]);
  const [selectedProd, setSelectedProd] = useState<string>("");

  function handleSearch(): void {
    if (!searchInputRef.current) return;
    window.electronAPI
      .getProdsBySearch(searchInputRef.current.value)
      .then()
      .then((data) => {
        setProds(JSON.parse(data));
      });
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
          selectedProd === prod.mainCode ? (
            <div
              key={prod.mainCode}
              className={styles.item}
              onClick={() => setSelectedProd(prod.mainCode)}
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
            <div key={prod.mainCode} className={styles.selectedItem}>
              <div className={styles.selectedItemContent}></div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
