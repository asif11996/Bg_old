import { Dimensions, PixelRatio } from "react-native";
import React, { useState, useEffect, useCallback } from "react";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const pixelRatio = PixelRatio.get();

// useEffect(() => {
//   wp(width);
//   hp(height);
// }, [width, height]);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

function normalize(size) {
  const newSize = size * pixelRatio;
  return Math.round(newSize);
}

export { hp, wp, normalize };
