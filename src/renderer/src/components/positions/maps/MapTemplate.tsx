import { Stage, Layer, Image, Rect } from "react-konva";

import { useEffect, useState } from "react";
import { MapTemplateProps } from "./map";
import { Product } from "../positions";

type RectAttr = { key: string; w: number; h: number; x: number; y: number };

export function MapTemplate({
  containerRef,
  imgAttr,
  positionsFile,
  maxW,
  maxH,
  setProds,
  setSelected,
}: MapTemplateProps): React.JSX.Element {
  const pos = imgAttr.position;
  const image = imgAttr.image;
  const [hovered, setHovered] = useState<string | null>(null);
  const [positions, setPositions] = useState<RectAttr[]>([]);

  function getProducts(key: string): void {
    setSelected(true);

    console.log(key);
    let room = "";
    if (positionsFile.toLowerCase().includes("yellow")) {
      room = "yellow";
    } else if (positionsFile.toLowerCase().includes("back")) {
      room = "back";
    } else if (positionsFile.toLowerCase().includes("front")) {
      room = "front";
    } else return;

    window.electronAPI.getProdsByRack(key, room).then((res) => {
      const prods = JSON.parse(res) as Product[];
      setProds(prods);
    });
  }

  useEffect(() => {
    window.electronAPI
      .getRectOfPos(positionsFile, image.width, image.height, pos, maxW, maxH)
      .then((pos) => {
        setPositions(pos);
      })
      .catch((err) => console.log(err));
  }, [image, pos, positionsFile, maxH, maxW, imgAttr]);

  return (
    <Stage
      width={containerRef.current?.clientWidth}
      height={containerRef.current?.clientHeight}
    >
      <Layer>
        <Image
          onClick={() => {
            console.log(image.width, image.height);
          }}
          x={pos[0]}
          y={pos[1]}
          image={image}
        />
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
            onClick={() => getProducts(obj.key)}
            onMouseOver={() => setHovered(obj.key)}
            onMouseOut={() => setHovered(null)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
