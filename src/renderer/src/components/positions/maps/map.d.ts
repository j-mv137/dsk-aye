export interface MapTemplateProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
  positionsFile: string;
  maxW: number;
  maxH: number;
}

export interface MapProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
}
