import { createTheme } from "@mui/material";

export const appTheme = createTheme({

  // Temporary dimensions set for header and footer. Change later?
  dimensions: {
    headerHeight: 64,  
    footerHeight: 48,
  },

  palette: {
    background: {
      default: "#EFF0F475",
    },
    primary: {
      main: "#323D72",
    },
    chatbot: {
      title: "#4ade80",
    },
  },
});

