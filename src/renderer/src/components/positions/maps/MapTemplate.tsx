import { Stage, Layer, Image, Rect } from "react-konva";

import { useEffect, useState } from "react";
import { MapTemplateProps } from "./map";
import { MAP_LAYOUT, Product } from "../utilsPositions";
import { usePositionsStore } from "../positionStore";

type RectAttr = { key: string; w: number; h: number; x: number; y: number };

export function MapTemplate({
  containerRef,
  imgAttr,
  positionsFile,
  maxW,
  maxH,
  setProds, //  both are passed down to
  setSelected, // alter the state of the parent (the positions component)
}: MapTemplateProps): React.JSX.Element {
  const pos = imgAttr.position;
  const image = imgAttr.image;

  const [hovered, setHovered] = useState<string | null>(null);
  const [positions, setPositions] = useState<RectAttr[]>([]);

  const addPosState = usePositionsStore((state) => state.addPosState);
  const appendPrevPos = usePositionsStore((state) => state.appendPrevPos);

  const currRoom = usePositionsStore((state) => state.currRoom);

  function getProducts(key: string): void {
    const room = MAP_LAYOUT[currRoom].label;

    window.electronAPI.getProdsByRack(key, room).then((res) => {
      setSelected(true);
      const prods = JSON.parse(res) as Product[];
      setProds(prods);
    });
  }

  function handleAddPos(key: string): void {
    const room = MAP_LAYOUT[currRoom].label;

    window.electronAPI
      .getPosLevels(key, room) // get posible levels
      .then((res) => {
        const levels = JSON.parse(res) as number[];
        levels.sort();
        appendPrevPos({
          room: MAP_LAYOUT[currRoom].label,
          key: key,
          posLevels: levels,
        });
      })
      .catch((err) => {
        // TODO: display toast

        console.log(err);
      });
  }

  useEffect(() => {
    window.electronAPI
      .getRectOfPos(positionsFile, image.width, image.height, pos, maxW, maxH)
      .then((pos) => {
        setPositions(pos);
      })
      .catch((err) => console.log(err));
  }, [image, pos, positionsFile, maxH, maxW]);

  return (
    <Stage
      width={containerRef.current?.clientWidth}
      height={containerRef.current?.clientHeight}
    >
      <Layer>
        <Image x={pos[0]} y={pos[1]} image={image} />
      </Layer>
      <Layer>
        {positions.map((obj) => (
          <Rect
            on
            key={obj.key}
            width={obj.w}
            height={obj.h}
            x={obj.x}
            y={obj.y}
            fill={"gray"}
            opacity={obj.key === hovered ? 0.5 : 0}
            onClick={() => {
              console.log(addPosState);
              if (!addPosState) return getProducts(obj.key);

              handleAddPos(obj.key);
            }}
            onMouseOver={() => setHovered(obj.key)}
            onMouseOut={() => setHovered(null)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
