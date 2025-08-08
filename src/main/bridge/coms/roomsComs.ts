import fs from "node:fs";
import { join } from "node:path";
import { requestApi } from "../request";

type posObject = { key: string; points: number[] };
type RectAttr = { key: string; w: number; h: number; x: number; y: number };

export function handleReadPos(
  fileName: string,
  imgW,
  imgH: number,
  pos: number[],
  imgMaxW,
  imgMaxH: number
): RectAttr[] {
  try {
    const positionsStr = fs.readFileSync(
      join(__dirname, "../resources/positions", fileName),
      {
        encoding: "utf8",
      }
    );

    // max size of the map.
    const maxW = imgMaxW;
    const maxH = imgMaxH;

    const posJson = <posObject[]>JSON.parse(positionsStr);
    const rectObjs: RectAttr[] = [];

    posJson.forEach((obj) => {
      const width = Math.abs(obj.points[0] - obj.points[2]);
      const height = Math.abs(obj.points[1] - obj.points[3]);

      const wRatio = width / maxW;
      const hRatio = height / maxH;

      // Check where the rect. starts when size of map is max.
      const x = Math.min(obj.points[0], obj.points[2]);
      const y = Math.min(obj.points[1], obj.points[3]);

      const xRatio = x / maxW;
      const yRatio = y / maxH;

      const RectObj = {
        key: obj.key,
        w: wRatio * imgW, // adjust the size of each rect with respect to
        h: hRatio * imgH, // current size of the img. map

        //===============//
        //               //
        // imgstart      //
        //               //
        //               //
        // imgend        //
        //               // have to take into account the white space
        //===============// when resizing start pos. for eac rect.

        x: imgW * xRatio + pos[0], // same here just need to adjust
        y: imgH * yRatio + pos[1], // for the change of pos. of the img itself
      };
      rectObjs.push(RectObj);
    });

    return rectObjs;
  } catch (err) {
    console.error(err);
    return [{ key: "", w: 0, h: 0, x: 0, y: 0 }];
  }
}

export function handleGetProdsByRack(key, room: string): Promise<string> {
  return requestApi("Positions", "getProdsByRack", [key, room]);
}

export function handleAddPosToProd(
  prodId: number,
  positionJson: string
): Promise<string> {
  return requestApi("Positions", "addPosToProd", [prodId, positionJson]);
}

export function handleGetPosForProd(prodId: number): Promise<string> {
  return requestApi("Positions", "getPosForProd", [prodId]);
}

export function handleGetPosibleLvls(key, room: string): Promise<string> {
  return requestApi("Positions", "getPosLevels", [key, room]);
}

//
// elit software eng.
export function handleSearchProds(query: string): Promise<string> {
  return requestApi("Products", "getProdsBySearch", [query]);
}
