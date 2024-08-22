import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { hp } from "../style/Dimensions";

const useOrientation = () => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    orientation:
      Dimensions.get("window").width > Dimensions.get("window").height
        ? "landscape"
        : "portrait"
  });

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setDimensions({
        width,
        height,
        orientation: width > height ? "landscape" : "portrait"
      });
    };

    updateOrientation();

    Dimensions.addEventListener("change", updateOrientation);

    return () => {
      return () => {
        // Ensure the remove function is called on the event listener
        dimensionChangeListener.remove();
      };
      Dimensions.removeEventListener("change", updateOrientation);
    };
  }, []);

  return dimensions;
};

export default useOrientation;
