import { MapProps } from "./maps/map";

import { BackMap } from "./maps/rooms/backMap";
import { FrontMap } from "./maps/rooms/frontMap";
import { YellowMap } from "./maps/rooms/yellowMap";

import frontImg from "@renderer/assets/images/Rooms/front.png";
import backImg from "@renderer/assets/images/Rooms/back.png";
import yellowImg from "@renderer/assets/images/Rooms/yellow.png";

export const MAP_LAYOUT: Map[] = [
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

export type Map = {
  map: React.FC<MapProps>;
  img: string;
  right: boolean;
  left: boolean;
  to: number;
  from: number;
};

export type ImgAttr = { image: HTMLImageElement; position: number[] };

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
export function capitalizeFirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
}
