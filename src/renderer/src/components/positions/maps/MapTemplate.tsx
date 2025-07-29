import { Stage, Layer, Image, Rect } from "react-konva";

import { useEffect, useState } from "react";
import { MapTemplateProps } from "./map";

type RectAttr = { key: string; w: number; h: number; x: number; y: number };

export function MapTemplate({
  containerRef,
  imgAttr,
  positionsFile,
}: MapTemplateProps): React.JSX.Element {
  const pos = imgAttr.position;
  const image = imgAttr.image;
  const [hovered, setHovered] = useState<string | null>(null);
  const [positions, setPositions] = useState<RectAttr[]>([
    { key: "", w: 0, h: 0, x: 0, y: 0 },
  ]);

  useEffect(() => {
    window.electronAPI
      .getRectOfPos(positionsFile, image.width, image.height, pos)
      .then((pos) => setPositions(pos))
      .catch((err) => console.log(err));
  }, [image, pos, positionsFile]);

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
            key={obj.key}
            width={obj.w}
            height={obj.h}
            x={obj.x}
            y={obj.y}
            fill={"gray"}
            opacity={obj.key === hovered ? 0.5 : 0}
            onMouseOver={() => setHovered(obj.key)}
            onMouseOut={() => setHovered(null)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
