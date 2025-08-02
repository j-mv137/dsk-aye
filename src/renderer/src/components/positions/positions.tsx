import styles from "./positions.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  FileQuestionMark,
  MoveLeft,
  MoveRight,
  SearchIcon,
} from "lucide-react";

import { FrontMap } from "./maps/rooms/FrontMap";

import frontImg from "@renderer/assets/images/Rooms/front.png";
import backImg from "@renderer/assets/images/Rooms/back.png";
import yellowImg from "@renderer/assets/images/Rooms/yellow.png";

import { ContainerDown } from "../utils/layout1";
import { Input } from "../utils/input/input";
import { MapProps } from "./maps/map";
import { BackMap } from "./maps/rooms/BackMap";
import { YellowMap } from "./maps/rooms/YellowMap";

const MAP_LAYOUT: Map[] = [
  {
    map: FrontMap,
    img: frontImg,
    right: true,
    left: false,
    to: 1,
    from: 0,
  },
  {
    map: BackMap,
    img: backImg,
    right: true,
    left: true,
    to: 2,
    from: 0,
  },
  {
    map: YellowMap,
    img: yellowImg,
    right: false,
    left: true,
    to: 2,
    from: 1,
  },
];

type Map = {
  map: React.FC<MapProps>;
  img: string;
  right: boolean;
  left: boolean;
  to: number;
  from: number;
};

type ImgAttr = { image: HTMLImageElement; position: number[] };

export type Product = {
  id: number;
  mainCode: string;
  secondCode: string;
  description: string;
  department: string;
  category: string;
  cost: number;
  sellPrice: number;
  currency: string;
  artNum: number;
  minQuantity: number;
};

// random func.
function capitalizeFirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
}

export function Position(): React.JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [text, setText] = useState("");
  const [prods, setProds] = useState<Product[]>([]);
  const [imgAttr, setImgAttr] = useState<ImgAttr>({
    image: new window.Image(),
    position: [0, 0],
  });
  const [MapObj, setMapObj] = useState<Map>(MAP_LAYOUT[0]);

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

  useEffect(() => {
    const mapContainerObs = new ResizeObserver((entries) => {
      if (entries.length > 1) return;
      if (!mapContainerRef.current) {
        return;
      }
      const img = new window.Image();
      const w = mapContainerRef.current.clientWidth;
      const h = mapContainerRef.current.clientHeight;
      function handleLoad(event: Event): void {
        const image = event.currentTarget;
        if (!(image instanceof HTMLImageElement)) {
          return;
        }
        const naturalWidth = image.width;
        const naturalHeight = image.height;
        const vratio = h / naturalHeight;
        const hratio = w / naturalWidth;
        const ratio = Math.min(vratio, hratio);
        const width = naturalWidth * ratio;
        const height = naturalHeight * ratio;
        const xOffset = (w - width) / 2;
        const yOffset = (h - height) / 2;
        image.width = width;
        image.height = height;
        setImgAttr({ image: image, position: [xOffset, yOffset] });
      }
      img.addEventListener("load", handleLoad);
      img.src = MapObj.img;
      return () => img.removeEventListener("load", handleLoad);
    });
    if (mapContainerRef.current)
      mapContainerObs.observe(mapContainerRef.current);
  }, [MapObj.img, mapContainerRef]);

  return (
    <ContainerDown>
      <>
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
            {prods?.map((prod) => (
              <div key={prod.mainCode} className={styles.item}>
                <div className={styles.itemContent}>
                  <div className={styles.codes}>
                    <span>{prod.mainCode}</span>
                    <span>{prod.secondCode}</span>
                  </div>
                  <span>{capitalizeFirst(prod.description)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mapContainer} ref={mapContainerRef}>
          {MapObj.left && (
            <button
              className={styles.leftArrow}
              onClick={() => setMapObj((mapObj) => MAP_LAYOUT[mapObj.from])}
            >
              <MoveLeft strokeWidth={1} size={20} />
            </button>
          )}
          <MapObj.map containerRef={mapContainerRef} imgAttr={imgAttr} />
          {MapObj.right && (
            <button
              className={styles.rightArrow}
              onClick={() => setMapObj((mapObj) => MAP_LAYOUT[mapObj.to])}
            >
              <MoveRight strokeWidth={1} size={20} />
            </button>
          )}
        </div>
      </>
    </ContainerDown>
  );
}
