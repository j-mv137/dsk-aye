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

  selectedPos: Record<string, Position>;
  setSelectedPos: (room, key: string, level: number) => void;
  popSelectedPos: () => void;
  clearSelectedPos: () => void;
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

  selectedPos: {},
  setSelectedPos: (room, key: string, level: number) =>
    set((state) => {
      state.selectedPos[`${room}-${key}`] = { room, key, level };

      return state.selectedPos;
    }),
  popSelectedPos: () => {
    set((state) => {
      const last = Object.keys(state.selectedPos)[-1];

      delete state.selectedPos[last];

      return state.selectedPos;
    });
  },
  clearSelectedPos: () => set(() => ({ selectedPos: {} })),
}));
