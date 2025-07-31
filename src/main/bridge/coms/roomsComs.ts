import fs from "node:fs";
import { join } from "node:path";
import { requestApi } from "../request";

type posObject = { key: string; points: number[] };
type RectAttr = { key: string; w: number; h: number; x: number; y: number };

export function handleReadPos(
  fileName: string,
  imgW,
  imgH: number,
  pos: number[]
): RectAttr[] {
  try {
    const positionsStr = fs.readFileSync(
      join(__dirname, "../resources/positions", fileName),
      {
        encoding: "utf8",
      }
    );
    const maxW = 926;
    const maxH = 561;

    const posJson = <posObject[]>JSON.parse(positionsStr);
    const rectObjs: RectAttr[] = [];
    posJson.forEach((obj) => {
      const width = Math.abs(obj.points[0] - obj.points[2]);
      const height = Math.abs(obj.points[1] - obj.points[3]);
      const wRatio = width / maxW;
      const hRatio = height / maxH;

      const x = Math.min(obj.points[0], obj.points[2]);
      const y = Math.min(obj.points[1], obj.points[3]);

      const xRatio = x / maxW;
      const yRatio = y / maxH;

      const RectObj = {
        key: obj.key,
        w: wRatio * imgW,
        h: hRatio * imgH,
        x: imgW * xRatio + pos[0],
        y: imgH * yRatio + pos[1],
      };
      rectObjs.push(RectObj);
    });

    return rectObjs;
  } catch (err) {
    console.error(err);
    return [{ key: "", w: 0, h: 0, x: 0, y: 0 }];
  }
}

export function handleSearchProds(query: string): Promise<string | void> {
  return requestApi("Products", "getProdsBySearch", [query]);
}
