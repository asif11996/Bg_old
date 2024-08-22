import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const hp = (percentage) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};
export { hp, wp };
const orders = {
  title: "Booking",
  color: { start: "#17EAD9", end: "#6078EA" }
};
export const categories = [
  {
    title: "Tickets",
    color: { start: "#17EAD9", end: "#6078EA" }
  },
  {
    title: "GuestList",
    color: { start: "#17EAD9", end: "#70789D" }
  },
  {
    title: "Teamate",
    color: { start: "#FAD961", end: "#F76B1C" }
  },
  {
    title: "Services",
    color: { start: "#17EAD9", end: "#6078EA" }
  }
];
export const COLORS = {
  primary: "#321A0F",
  // primary: '#f92e0b',

  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(255, 219, 205)",
  onPrimaryContainer: "rgba(63, 4, 0, 0.5)",
  // secondary: '#321A0F',

  secondary: "#f92e0b",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(255, 218, 211)",
  onSecondaryContainer: "rgb(63, 4, 0)",
  tertiary: "#042C5C",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(151, 240, 255)",
  onTertiaryContainer: "rgb(0, 31, 36)",
  onInactive: "#999999",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(255, 251, 255)",
  onBackground: "rgb(32, 26, 24)",
  surface: "rgb(255, 251, 255)",
  onSurface: "rgb(32, 26, 24)",
  surfaceVariant: "rgb(245, 222, 213)",
  onSurfaceVariant: "rgb(83, 68, 61)",
  outline: "rgb(133, 115, 108)",
  outlineVariant: "rgb(216, 194, 186)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(54, 47, 44)",
  inverseOnSurface: "rgb(251, 238, 234)",
  inversePrimary: "rgb(255, 181, 150)",
  elevation: {
    level0: "transparent",
    level1: "rgb(250, 242, 244)",
    level2: "rgb(247, 237, 237)",
    level3: "rgb(244, 231, 230)",
    level4: "rgb(243, 229, 228)",
    level5: "rgb(241, 226, 223)"
  },
  surfaceDisabled: "rgba(32, 26, 24, 0.12)",
  onSurfaceDisabled: "rgba(32, 26, 24, 0.38)",
  backdrop: "rgba(59, 45, 40, 0.4)"
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body5: 10,

  // app dimensions
  width,
  height

  // Dimensions
};
export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22
  },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 }
};

export const darkTheme = {
  name: "dark",
  backgroundColor1: COLORS.gray85,
  backgroundColor2: COLORS.gray90,
  backgroundColor3: COLORS.gray90,
  backgroundColor4: COLORS.primary,
  backgroundColor5: COLORS.gray85,
  backgroundColor6: COLORS.black,
  backgroundColor7: COLORS.gray90,
  backgroundColor8: COLORS.gray70,
  lineDivider: COLORS.gray70,
  borderColor1: COLORS.gray70,
  borderColor2: COLORS.gray70,
  textColor: COLORS.white,
  textColor2: COLORS.white,
  textColor3: COLORS.gray40,
  textColor4: COLORS.white,
  textColor5: COLORS.gray30,
  textColor6: COLORS.gray30,
  textColor7: COLORS.gray40,
  tintColor: COLORS.white,
  dotColor1: COLORS.white,
  dotColor2: COLORS.primary
};

export const lightTheme = {
  name: "light",
  backgroundColor1: COLORS.white,
  backgroundColor2: COLORS.primary3,
  backgroundColor3: COLORS.additionalColor11,
  backgroundColor4: COLORS.white,
  backgroundColor5: COLORS.additionalColor13,
  backgroundColor6: COLORS.primary3,
  backgroundColor7: COLORS.white,
  backgroundColor8: COLORS.gray10,
  lineDivider: COLORS.gray20,
  borderColor1: COLORS.white,
  borderColor2: COLORS.black,
  textColor: COLORS.black,
  textColor2: COLORS.primary,
  textColor3: COLORS.gray80,
  textColor4: COLORS.white,
  textColor5: COLORS.black,
  textColor6: COLORS.gray,
  textColor7: COLORS.black,
  tintColor: COLORS.black,
  dotColor1: COLORS.gray20,
  dotColor2: COLORS.primary3
};

export const selectedTheme = darkTheme;

const appTheme = { COLORS, SIZES, FONTS, darkTheme, lightTheme, categories };

export default appTheme;
