export interface MapTemplateProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
  positionsFile: string;
  maxW: number;
  maxH: number;
  setProds: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MapProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
  setProds: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
