export interface MapTemplateProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
  positionsFile: string;
}

export interface MapProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgAttr: { image: HTMLImageElement; position: number[] };
}
