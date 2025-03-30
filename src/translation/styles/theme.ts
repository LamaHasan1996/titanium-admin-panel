import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#94b9e3",
    },
    secondary: {
      main: "#512d6a",
    },
    text: {
      primary: "#333333",
    },
  },
});

export const getTheme = ({ lang }: { lang: string }) =>
  createTheme({
    direction: lang === "en" ? "ltr" : "rtl",
    typography: {
      fontFamily: lang === "en" ? "Poppins" : "Montserrat",
    },
    palette: {
      mode: "light",
      background: {
        default: "#f4f4f4",
      },
      primary: {
        main: "#94b9e3",
      },
      secondary: {
        main: "#512d6a",
      },
      text: {
        primary: "#333333",
      },
    },
  });
