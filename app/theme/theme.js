import { Dimensions } from "react-native";

const theme = {
  colors: {
    primary: "blue",
    secondary: "silver",
    textPrimary: "",
    textSecondary: "",
    modernaRed: "#E11F1D",
    modernaYellow: "#EBA900",
    modernaGreen: "#00993F",
    modernaAqua: "#00AE9E",
    modernaBlue: "#0052A1",
    modernaPurple: "#530644",
    modernaRose: "#E5005A",
    lightgray: "rgba(217,217,217,0.70)",
    gray: "rgba(173, 173, 173, 0.70)",
    active: "#5BC2A7",
    inactive: "#9D9D9D",
    inputcolor: "#CCCCCC",
    white: "#fff",
    black: "black",
    transparent: "transparent",
  },
  fontSize: {
    body: 14,
    details: 13.5,
    heading: 25,
    subheading: 22,
    title: 20,
    subtitle: 17,
    small: 12.5,
    error: 9,
    smaller: 11,
  },
  fonts: {
    main: "System",
  },
  fontWeight: {
    bold: "700",
    bolder: "900",
    normal: "500",
    light: "100",
    softbold: "600",
  },
  dimensions: {
    maxWidth: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height,
  },
  buttonSize: {
    lg: 270,
    df: 180,
    sm: "100%",
  },
};
export default theme;
