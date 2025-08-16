import { useEffect, useRef, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

import styles from "./positions.module.css";

import { ContainerDown } from "../utils/layout1";
import { Selected } from "./selected/selected";
import { SearchProds } from "./search/searchProds";
import { ImgAttr, MAP_LAYOUT, Map, Product } from "./utilsPositions";
import { usePositionsStore } from "./positionStore";

export function Position(): React.JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [imgAttr, setImgAttr] = useState<ImgAttr>({
    image: new window.Image(),
    position: [0, 0],
  });

  const addPosState = usePositionsStore((state) => state.addPosState);
  const setCurrRoom = usePositionsStore((state) => state.setCurrRoom);

  const [MapObj, setMapObj] = useState<Map>(MAP_LAYOUT[0]);

  // setProdsInRack and setSelected are passed to the mapTemplate component
  const [selected, setSelected] = useState<boolean>(false);
  const [prodsInRack, setProdsInRack] = useState<Product[]>([]);

  // Resizing the map inside the canva element
  useEffect(() => {
    const mapContainerObs = new ResizeObserver(() => {
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
        // Same as in getPositionRect or some in roomsComs.ts
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
      {selected && !addPosState && (
        <Selected setSelected={setSelected} prods={prodsInRack} />
      )}

      <SearchProds />

      <div className={styles.mapContainer} ref={mapContainerRef}>
        {MapObj.left && (
          <button
            className={styles.leftArrow}
            onClick={() => {
              setCurrRoom(MapObj.from);
              setMapObj((mapObj) => MAP_LAYOUT[mapObj.from]);
            }}
          >
            <MoveLeft strokeWidth={1} size={20} />
          </button>
        )}
        <MapObj.map
          containerRef={mapContainerRef}
          imgAttr={imgAttr}
          setProds={setProdsInRack}
          setSelected={setSelected}
        />
        {MapObj.right && (
          <button
            className={styles.rightArrow}
            onClick={() => {
              setCurrRoom(MapObj.to);
              setMapObj((mapObj) => MAP_LAYOUT[mapObj.to]);
            }}
          >
            <MoveRight strokeWidth={1} size={20} />
          </button>
        )}
      </div>
    </ContainerDown>
  );
}
