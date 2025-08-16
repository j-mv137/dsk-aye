import { useRef, useState } from "react";
import { Input } from "../utils/input/input";
import { ContainerDown } from "../utils/layout1";
import styles from "./sales.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../utils/select/select";
import { SALE_TYPE } from "./salesUtils";
import { Dialog, DialogContent, DialogTrigger } from "../utils/dialog/dialog";
import { Button } from "../utils/button/button";
import { SearchIcon } from "lucide-react";
import { Product } from "../positions/utilsPositions";
export function Sales(): React.JSX.Element {
  const searchBtnRef = useRef<null | HTMLButtonElement>(null);
  const searchInputRef = useRef<null | HTMLInputElement>(null);

  const [inputProdSelected, setInputProdSelected] = useState<boolean>(false);
  const [lastLength, setLastLegth] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  function handleGetProdsBySearch(query: string): void {
    window.electronAPI.getProdsBySearch(query).then((data) => {
      const searchedProds = JSON.parse(data) as Product[];

      setProducts(searchedProds);
    });
  }

  return (
    <ContainerDown
      onKeyDown={(e) => {
        if (e.key === "Enter") searchBtnRef.current?.click();
      }}
    >
      <div className={styles.sideCont}>
        {/* HEADER */}
        <div className={styles.sideHeaderCont}>
          <div className={styles.imgCont}></div>
          <div className={styles.prodInfCont}>
            <div className={styles.prodTxt}>
              <span className={styles.mainCode}>MAIN CODE</span>
              <span>SECOND CODE</span>
            </div>
            <span>$25.00</span>
            <div className={styles.searchProdCont}>
              {inputProdSelected && (
                <div onClick={() => {}} className={styles.smSearchCont}>
                  {products.length > 1 ? (
                    products.map((prod) => (
                      <div key={prod.id} className={styles.searchedProdCont}>
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
                    const currLength = e.target.value.split(" ").length;
                    if (
                      currLength > lastLength &&
                      e.target.value.includes(" ")
                    ) {
                      handleGetProdsBySearch(e.target.value);

                      setInputProdSelected(true);
                      setLastLegth(currLength);
                    } else if (currLength > 1) {
                      setLastLegth(currLength);
                      setInputProdSelected(true);
                    } else {
                      setLastLegth(0);
                      setInputProdSelected(false);
                    }
                  }}
                />
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
              </div>
            </div>
          </div>
        </div>

        {/* CLIENT & TYPE */}
        <div
          className={styles.sideClTyCont}
          onClick={() => {
            setInputProdSelected(false);
          }}
        >
          <div className={styles.clientCont}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className={styles.clientBtn}>Público en General</Button>
              </DialogTrigger>
              <DialogContent>
                <div className={styles.searchClientsCont}>
                  <Input className={styles.searchClientsInput} />
                  <div className={styles.foundClients}></div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className={styles.clientCont}>
            <Select>
              <SelectTrigger className={styles.selectType}>
                <SelectValue placeholder="Tipo de nota" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SALE_TYPE.map((saleType) => (
                    <SelectItem key={saleType.label} value={saleType.label}>
                      {saleType.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* OPTIONS */}
        <div className={styles.optionsCont}>
          <div className={styles.option}></div>
          <div className={styles.option}></div>
          <div className={styles.option}></div>
          <div className={styles.option}></div>
          <div className={styles.option}></div>
        </div>
      </div>

      {/* DISPLAY PRODS. */}
      <div className={styles.prodsCont}>
        <div className={styles.prodRow}></div>
      </div>
    </ContainerDown>
  );
}
