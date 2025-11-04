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
    label: "front",
    right: true,
    left: false,
    to: 1,
    from: 0,
  },
  {
    map: BackMap,
    label: "back",
    img: backImg,
    right: true,
    left: true,
    to: 2,
    from: 0,
  },
  {
    map: YellowMap,
    label: "yellow",
    img: yellowImg,
    right: false,
    left: true,
    to: 2,
    from: 1,
  },
];

export type Map = {
  map: React.FC<MapProps>;
  label: "front" | "back" | "yellow";
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

export type Position = {
  room: string;
  key: string;
  level: number;
};

export type ReadyPos = {
  room: string;
  key: string;
  level: number;
  ready: boolean;
};

export type PrevToAddPos = {
  room: string;
  key: string;
  posLevels: number[];
};

// random func.
export function capitalizeFirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
}

const ROOM_SPANISH = {
  front: "Frente",
  back: "Bodega",
  yellow: "C. Amarillo",
};

export function parsePosToDisplay(pos: Position): Position {
  const sRoom = ROOM_SPANISH[pos.room];

  pos.room = sRoom;

  return pos;
}

export type SelectedLvl = {
  level: number;
  rowId: number;
};

export interface MetaType {
  handleUpdateReadyPos: (room, key: string, level: number) => void;
}
