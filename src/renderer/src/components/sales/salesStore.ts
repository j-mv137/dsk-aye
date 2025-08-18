import { create } from "zustand";
import { Product } from "../positions/utilsPositions";

interface SalesStore {
  selectedProd: Product | null;
  setSelectedProd: (prod: Product) => void;

  inputProdSelected: boolean;
  setInputProdSelected: (isInputSelected: boolean) => void;
}

export const useSalesStore = create<SalesStore>((set) => ({
  selectedProd: null,
  setSelectedProd: (prod) => set(() => ({ selectedProd: prod })),

  inputProdSelected: false,
  setInputProdSelected: (isInputSelected) =>
    set(() => ({ inputProdSelected: isInputSelected })),
}));
