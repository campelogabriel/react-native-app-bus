import { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { Marker } from "react-native-maps";

// @ts-ignore
import carIcon from "../../assets/00016.png";
import { Position } from "src/types/PositionType";
import { getRotation } from "src/utils/getRotationBus";

const MarkerAnimated = Animated.createAnimatedComponent(Marker);

function MarkerCustom({ coords, setModal, setTabStyle, bus, setModalInfoBus }) {
  const [newCoordsBus, setNewCoordsBus] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });
  const [oldCoordsBus, setOldCoordsBus] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });

  const [rootBus, setRootBus] = useState<number>(0);

  // @ts-ignore
  const marker = useRef<MarkerAnimated | null>();

  // console.log("newsCoordsBus", newCoordsBus);

  useEffect(() => {
    setNewCoordsBus(coords);
  }, []);

  useEffect(() => {
    // setOldCoordsBus(newCoordsBus);
    // setNewCoordsBus(coords);
    animate(oldCoordsBus, coords);
  }, [coords]);

  // useEffect(() => {
  //   animate(oldCoordsBus, newCoordsBus);
  // }, [newCoordsBus]);

  const animate = (start: Position, final: Position) => {
    // if (start.latitude == 0 && start.longitude == 0) return;

    //VERIFICA SE HOUVE MUDANÇA NA POSIÇAO, OU SEJA, NECESSITA DE 2 COORDENADAS
    if (start.latitude == final.latitude && start.longitude == final.longitude)
      return;

    //CALCULO DA ROTAÇAO COM 2 COORDENADAS
    const newRoot = getRotation(
      { latitude: start.latitude, longitude: start.longitude },
      final
    );

    //ATUALIZAR A ROTAÇAO E AS COORDENADAS
    setRootBus(newRoot);
    setOldCoordsBus(start);
    setNewCoordsBus(final);

    marker.current.animateMarkerToCoordinate(final, 500);
  };

  return (
    <MarkerAnimated
      ref={(el) => (marker.current = el)}
      anchor={{ x: 0.5, y: 0.5 }}
      rotation={rootBus}
      coordinate={{
        latitude: newCoordsBus.latitude,
        longitude: newCoordsBus.longitude,
      }}
      image={carIcon}
      flat={true}
      onPress={() => {
        setModal(true);
        setTabStyle(false);
        setModalInfoBus(bus);
      }}
    />
  );
}

export default MarkerCustom;
