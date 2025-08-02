import { MapProps } from "../map";
import { MapTemplate } from "../MapTemplate";

export const YellowMap = ({
  containerRef,
  imgAttr,
}: MapProps): React.JSX.Element => {
  return (
    <MapTemplate
      containerRef={containerRef}
      imgAttr={imgAttr}
      positionsFile="positionsYellow.json"
      maxW={784}
      maxH={968}
    />
  );
};
