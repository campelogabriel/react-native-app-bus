import { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { Marker } from "react-native-maps";

// @ts-ignore
import carIcon from "../../assets/00016.png";
import { Position } from "src/types/PositionType";
import { getRotation } from "src/utils/getRotationBus";

const MarkerAnimated = Animated.createAnimatedComponent(Marker);

function MarkerCustom({ coordsFinal, setModal, setTabStyle, curRot }) {
  // @ts-ignore
  const marker = useRef<MarkerAnimated | null>();
  const [coords, setCoords] = useState<Position | null>();
  const [root, setRot] = useState<number>();

  useEffect(() => {
    animate(coords, coordsFinal);
  }, [coordsFinal]);

  const animate = (start: Position, final: Position) => {
    //VERIFICA SE HOUVE MUDANÇA NA POSIÇAO, OU SEJA, NECESSITA DE 2 COORDENADAS
    if (start.latitude == final.latitude && start.longitude == final.longitude)
      return;

    //CALCULO DA ROTAÇAO COM 2 COORDENADAS
    const newRoot = getRotation(
      { latitude: start.latitude, longitude: start.longitude },
      final
    );

    //ATUALIZAR A ROTAÇAO E AS COORDENADAS
    setRot(newRoot);
    setCoords(final);

    marker.current.animateMarkerToCoordinate(final, 500);
  };

  return (
    <MarkerAnimated
      ref={(el) => (marker.current = el)}
      anchor={{ x: 0.5, y: 0.5 }}
      rotation={root}
      coordinate={{
        latitude: coords.latitude,
        longitude: coords.longitude,
      }}
      image={carIcon}
      flat={true}
      tracksViewChanges={true}
      onPress={() => {
        setModal(true);
        setTabStyle(false);
      }}
    />
  );
}

export default MarkerCustom;
