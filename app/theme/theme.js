import { Dimensions } from "react-native";

const theme = {
  colors: {
    primary: "blue",
    secondary: "silver",
    textPrimary: "",
    textSecondary: "",
    modernaRed: "#d22630",
    modernaYellow: "#ecaa20",
    modernaGreen: "#5BC2A7",
    modernaAqua: "#5BC2A7",
    lightgray: "rgba(217,217,217,0.70)",
    active: "#5BC2A7",
    inactive: "#9D9D9D",
    inputcolor: "#CCCCCC",
    white: "#fff",
    black:"black",
    transparent: "transparent"
  },
  fontSize: {
    body: 14,
    heading: 25,
    subheading: 22,
    title: 20,
    subtitle: 17,
    small: 12.5,
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
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
  },
  buttonSize:{
    lg:270,
    df:180,
    sm:140,
  }
  
};
export default theme;
