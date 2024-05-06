import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
function Radar() {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
        delay: 500,
      })
    ).start();
  }, []);
  return (
    <Animated.Image
      style={{
        ...styles.img,
        transform: [
          {
            rotateZ: rotate.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ["0deg", "55deg", "0deg"],
            }),
          },
        ],
      }}
      source={require("../../assets/satelite.png")}
    />
  );
}

export default Radar;

const styles = StyleSheet.create({
  img: {
    position: "absolute",
    zIndex: 10,
  },
});
