import { MapProps } from "../map";
import { MapTemplate } from "../MapTemplate";

export function BackMap({
  containerRef,
  imgAttr,
  setProds,
  setSelected,
}: MapProps): React.JSX.Element {
  return (
    <MapTemplate
      containerRef={containerRef}
      imgAttr={imgAttr}
      positionsFile="positionsBack.json"
      maxW={1078}
      maxH={868}
      setProds={setProds}
      setSelected={setSelected}
    />
  );
}
