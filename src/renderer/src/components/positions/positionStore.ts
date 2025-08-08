import { create } from "zustand";
import { Position, PrevToAddPos } from "./utilsPositions";

interface PositionsStore {
  addPosState: boolean;
  setAddPosState: (v: boolean) => void;

  prevToAddPos: PrevToAddPos[];
  appendPrevPos: (pos: PrevToAddPos) => void;
  clearPrevPos: () => void;
  popPrevPos: () => void;

  currRoom: number;
  setCurrRoom: (roomIdx: number) => void;

  posLevels: number[];
  setPosLevels: (levels: number[]) => void;

  readyPos: Position[];
  appendReadyPos: (pos: Position) => void;
  popReadyPos: () => void;
  clearReadyPos: () => void;
}

export const usePositionsStore = create<PositionsStore>((set) => ({
  addPosState: false,
  setAddPosState: (v) => set(() => ({ addPosState: v })),

  prevToAddPos: [],
  appendPrevPos: (pos) =>
    set((state) => ({ prevToAddPos: state.prevToAddPos.concat(pos) })),
  clearPrevPos: () => set(() => ({ prevToAddPos: [] })),
  popPrevPos: () =>
    set((state) => ({ prevToAddPos: state.prevToAddPos.slice(0, -1) })),

  currRoom: 0,
  setCurrRoom: (roomIdx) => set(() => ({ currRoom: roomIdx })),

  posLevels: [],
  setPosLevels: (levels) => set(() => ({ posLevels: levels })),

  readyPos: [],
  appendReadyPos: (pos) =>
    set((state) => ({ readyPos: state.readyPos.concat(pos) })),
  popReadyPos: () =>
    set((state) => ({ readyPos: state.readyPos.slice(0, -1) })),
  clearReadyPos: () => set(() => ({ readyPos: [] })),
}));
