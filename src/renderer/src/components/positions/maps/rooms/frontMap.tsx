import { MapProps } from "../map";
import { MapTemplate } from "../MapTemplate";

export const FrontMap = ({
  containerRef,
  imgAttr,
  setProds,
  setSelected,
}: MapProps): React.JSX.Element => {
  return (
    <MapTemplate
      containerRef={containerRef}
      imgAttr={imgAttr}
      positionsFile="positionsFront.json"
      maxW={1068}
      maxH={654}
      setProds={setProds}
      setSelected={setSelected}
    />
  );
};
